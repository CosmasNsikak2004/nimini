# NIMINI CO. — Medical Supplies & Healthcare Distribution

A responsive web application for NIMINI CO., a medical supplies and healthcare distribution company based in Houston, Texas. Built with React, TypeScript and Vite, with an AI customer assistant ("Nimi") powered by the Google Gemini API through a secure server-side endpoint.

## Features

- **Page loader**: animated SVG logo shown on first load (~1.5 s).
- **Top bar and navigation**: click-to-call line, "View Products" shortcut, sticky header that changes style on scroll, smooth-scroll links and an animated mobile menu.
- **Hero**: headline, social links, image grid and a "Request Supplies" call to action.
- **Services**: six service cards (ordering, drop-shipping, support, emergency requests, order tracking, procurement consultation).
- **About**: company story and key statistics (500+ facilities, 10+ years, 99% on-time delivery).
- **Testimonials**: auto-playing carousel (pauses on hover; 1 or 2 slides per view depending on screen width).
- **Products**: 3D rotating catalogue on desktop and a touch-friendly grid on mobile.
- **Supply request modal**: validated form opened from the hero, products and footer sections.
- **Contact**: validated contact form, embedded map and contact details.
- **Floating WhatsApp button** for quick contact.
- **Nimi AI assistant**: floating chat widget with suggested questions, typing indicator, session-persisted history and a direct-contact fallback if the AI is unavailable.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build tool | Vite |
| Styling | Custom CSS with responsive breakpoints (Tailwind CSS is installed) |
| Animation | Animate.css, CSS transitions, custom `useAOS` scroll-reveal hook |
| Icons / fonts | Font Awesome, Google Fonts |
| Server | Node.js, Express |
| AI | Google Gemini via `@google/genai` |
| Hosting | Vercel (serverless) or any Node host |

## Project Structure

```text
├── api/
│   └── chat.ts             # /api/chat endpoint (Express and Vercel compatible)
├── public/
│   └── assets/             # Images and icons
├── src/
│   ├── components/         # About, Banner, ChatWidget, Contact, Footer, Hero, Loader,
│   │                       # Navbar, Products, Services, SupplyModal, Testimonials,
│   │                       # TopBar, WhatsAppFloat
│   ├── data/
│   │   ├── siteData.ts     # Typed site content (nav, services, products, testimonials, contact)
│   │   └── content.ts      # Company profile and chatbot system-prompt builder
│   ├── hooks/
│   │   └── useAOS.ts       # IntersectionObserver scroll-animation hook
│   ├── App.tsx             # Page layout and shared state
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── server.ts               # Express server (serves the API; Vite middleware in development)
├── vercel.json             # Vercel rewrites
├── index.html              # HTML shell, SEO and social-sharing meta tags
└── package.json
```

## AI Assistant

The chat widget sends the conversation to `POST /api/chat`. The server:

1. applies a per-IP rate limit (20 requests per minute),
2. validates the messages (non-empty, last 20 kept, latest message at most 2,000 characters),
3. builds a system prompt from the same business data that renders the site,
4. calls Gemini (one retry on temporary errors), and
5. cleans the reply and returns `{ reply }`.

The assistant is restricted to NIMINI CO. topics, does not give medical advice and does not invent prices or stock levels. The API key stays on the server and is never sent to the browser.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/chat` | Send `{ messages: [{ role, content }] }`, receive `{ reply }` |
| GET | `/api/health` | Health check |

## Getting Started

**Prerequisites:** Node.js (LTS) and a Gemini API key from Google AI Studio.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   PORT=3000
   ```
3. Start the development server (Express + Vite):
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the full-stack development server |
| `npm run build` | Create a production build in `dist/` |
| `npm start` | Start the server (serves `dist/` when `NODE_ENV=production`) |
| `npm run lint` | Type-check with TypeScript |

## Deployment

- **Vercel:** import the repository, add `GEMINI_API_KEY` under Project Settings > Environment Variables, and deploy. `vercel.json` routes `/api/*` to the serverless function and everything else to `index.html`.
- **Node host / Cloud Run:** run `npm run build`, set `NODE_ENV=production` and `GEMINI_API_KEY`, then `npm start`.

Never commit your `.env` file.