import { GoogleGenAI } from '@google/genai';
import { buildNiminioSystemPrompt } from '../src/data/content';

// Simple in-memory rate limiter per IP address
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateLimits.entries()) {
    if (now > record.resetTime) {
      ipRateLimits.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model' | 'system';
  content: string;
}

/**
 * Universal handler for the /api/chat endpoint (Express & Vercel compatible)
 */
export async function chatHandler(req: any, res: any) {
  // CORS Headers
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed. Please send a POST request with conversation history.',
    });
  }

  // 1. Rate Limiting Check
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before sending another message.',
    });
  }

  // 2. Validate API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable on server.');
    return res.status(500).json({
      error:
        'The server is missing the GEMINI_API_KEY. Please ensure the environment variable is configured.',
    });
  }

  // 3. Validate Body Input
  const body = req.body;
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return res.status(400).json({
      error: 'Invalid request body. Expected an array of messages: { messages: [{ role, content }] }.',
    });
  }

  const rawMessages: ChatMessage[] = body.messages;

  // Sanitize and validate messages (keep last 20 messages for context)
  const validMessages = rawMessages
    .filter(
      (m) =>
        m &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        ['user', 'assistant', 'model'].includes(m.role)
    )
    .slice(-20);

  if (validMessages.length === 0) {
    return res.status(400).json({
      error: 'No valid message content provided.',
    });
  }

  // Validate message length
  const latestMessage = validMessages[validMessages.length - 1];
  if (latestMessage.content.length > 2000) {
    return res.status(400).json({
      error: 'Message is too long. Please limit each message to 2,000 characters.',
    });
  }

  try {
    // 4. Initialize official @google/genai SDK with User-Agent telemetry
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // 5. Build authoritative system grounding prompt from real business data
    const systemInstruction = buildNiminioSystemPrompt();

    // 6. Format contents for Gemini: map 'assistant' to 'model'
    const contents = validMessages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content.trim() }],
    }));

    // 7. Generate content with recommended gemini-3.8-flash model (with 1 retry for transient spikes)
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });
    } catch (firstErr: any) {
      const errMsg = firstErr?.message || '';
      if (errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        // Wait 800ms and retry once
        await new Promise((resolve) => setTimeout(resolve, 800));
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.4,
          },
        });
      } else {
        throw firstErr;
      }
    }

    const rawReply = response.text || "I'm sorry, I couldn't generate a response at this moment.";
    
    // Clean response: remove all asterisks (*) and em-dashes (—)
    const reply = rawReply
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/\*/g, '')
      .replace(/—/g, ', ')
      .replace(/–/g, '-')
      .replace(/ , /g, ', ')
      .trim();

    return res.status(200).json({
      reply,
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);

    let rawMessage = error?.message || '';
    let parsedMessage = '';

    try {
      const parsed = JSON.parse(rawMessage);
      if (parsed?.error?.message) {
        parsedMessage = parsed.error.message;
      }
    } catch {
      // not JSON string
    }

    const finalMessage = parsedMessage || rawMessage || 'An unexpected error occurred while communicating with the AI service.';

    // Check for high demand / temporary unavailability
    if (finalMessage.includes('high demand') || finalMessage.includes('UNAVAILABLE') || finalMessage.includes('503')) {
      return res.status(503).json({
        error: 'The AI service is temporarily experiencing high traffic. Please try again in a few moments, or contact NIMINI CO. directly.',
      });
    }

    // Check for quota or rate limit errors from Gemini
    if (finalMessage.includes('quota') || finalMessage.includes('RESOURCE_EXHAUSTED') || finalMessage.includes('429')) {
      return res.status(429).json({
        error: 'AI service rate limit reached. Please try again shortly or contact NIMINI CO. directly.',
      });
    }

    return res.status(502).json({
      error: finalMessage,
    });
  }
}

// Default export for Vercel Serverless Functions
export default chatHandler;
