# NIMINI CO. — Medical Supplies & Healthcare Distribution

A pixel-exact React + TypeScript + Vite port of the NIMINI CO. static website. Re-engineered using clean, modular React components, React state, and custom hooks while maintaining every original visual detail, media query, color value, and layout constraint.

## Features Replicated in React

1. **Top Bar**: Call line (+1 (346) 664-8018) and quick-action "VIEW PRODUCTS" button smooth-scrolling to the catalog.
2. **Navbar**:
   - Fixed header with brand icon and typography.
   - Smooth-scrolling anchor links for all sections (`#home`, `#about`, `#services`, `#product`, `#contact`).
   - Sticky / scrolled transition state (`.home.active`) triggered dynamically as the user scrolls.
   - Fully interactive mobile slide-down menu with animated hamburger-to-close (`fa-bars-staggered` <-> `fa-xmark`) toggle and auto-close upon navigation.
3. **Hero**:
   - Vertical social rail (Instagram, X/Twitter, WhatsApp).
   - Headline "Bringing Smiles Back to Health" with primary and secondary copy.
   - "REQUEST SUPPLIES" action that opens the modal.
   - 3-image responsive grid with Animate.css `fadeInRight` entrance.
4. **Services**:
   - Heading with 6 comprehensive service cards (Convenient Ordering, Customisation & Drop-Shipping, Superior Support, Emergency Supply Requests, Order Tracking, Procurement Consultation).
   - Responsive flex grid with gradient icon badges, hover lifts, and smooth scroll links.
5. **About**:
   - Company background story and origin as a long-term care pharmacy.
   - 3-image gallery grid.
   - Stat counters: 500+ Facilities Served, 10+ Years Experience, 99% On-Time Delivery.
6. **Testimonials**:
   - Responsive carousel with loop, autoplay (6s interval), and pause on hover.
   - Prev/Next navigation arrows with Font Awesome glyphs.
   - Responsive items-per-view (1 on mobile/tablet, 2 on desktop) matching Owl Carousel behavior via native React state.
7. **Banner**:
   - Full-width quote / mission statement with CEO attribution and fixed parallax background.
8. **Products**:
   - 3D rotating carousel (`transform-style: preserve-3d`) with 8 product images on desktop.
   - Optimized mobile product grid with touch-friendly cards.
   - "REQUEST A PRODUCT" modal trigger.
9. **Contact**:
   - Interactive contact form with validation and animated success confirmation state.
   - Google Maps iframe embed centered on Texas, USA.
   - 4 contact info boxes (Phone, Address, Email, Hours).
10. **Footer**:
    - Company mission summary.
    - Specialties list, quick links with chevron icons, social links, and emergency line.
    - Copyright and legal credits bar.
11. **Floating WhatsApp Button**:
    - Persistent bottom-right WhatsApp action with hover tooltip.
12. **Page Loader**:
    - Full-screen animated SVG path drawing and logo entrance displayed on initial page load (~1.5s).
13. **Supply Request Modal**:
    - Triggered from Hero, Products, and Footer.
    - Backdrop overlay click-to-close and ESC support.
    - Controlled form inputs, submit feedback state, and automatic reset.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Ported vanilla CSS with exact custom properties, CSS variables, and all 11 original breakpoints:
  `1480px`, `1300px`, `1200px`, `1150px`, `1100px`, `1050px`, `992px`, `850px`, `768px`, `576px`, `574px`.
- **Typography**: Google Fonts (DM Serif Display, Michroma, Signika)
- **Icons**: Font Awesome 6.4.2

## Project Structure

```text
├── public/
│   └── assets/             # Original image assets and phone-call.svg
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Banner.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── Products.tsx
│   │   ├── Services.tsx
│   │   ├── SupplyModal.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TopBar.tsx
│   │   ├── ChatWidget.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── data/
│   │   ├── content.ts      # Business grounding data & prompt builder
│   │   └── siteData.ts     # Content data (nav, services, testimonials, products)
│   ├── hooks/
│   │   └── useAOS.ts       # IntersectionObserver scroll animation hook
│   ├── App.tsx             # Root page layout and shared state
│   ├── index.css           # Global stylesheet ported from style.css
│   └── main.tsx            # React application entry
├── api/
│   └── chat.ts             # Serverless API endpoint for Gemini chat (/api/chat)
├── server.ts               # Full-stack Express server with Vite dev middleware
├── vercel.json             # Vercel serverless deployment config
├── index.html              # HTML shell with Google Fonts & Font Awesome
└── package.json
```

## AI Chatbot & Backend Setup

### Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

- **Local Development**: Add your key to `.env`. It is loaded securely via `dotenv` in `server.ts` and never exposed to the client.
- **Production (Vercel)**: Add `GEMINI_API_KEY` under **Project Settings > Environment Variables**.
- **Production (Cloud Run / AI Studio)**: Configure `GEMINI_API_KEY` in the **Settings > Secrets** panel or container environment configuration.

### Model & SDK Details
- **SDK**: Official `@google/genai` (`^2.4.0`)
- **Model**: `gemini-3.8-flash`
  - Selected according to the latest Google GenAI guidelines as the recommended model for real-time text and conversation tasks.
  - Delivers fast response times, strong instruction adherence, and grounded reasoning on business constraints without hallucination.

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the full-stack dev server:
   ```bash
   npm run dev
   ```
   This executes `tsx server.ts`, which runs the Express server on port 3000 with the `/api/chat` route and Vite's development middleware.

   Alternatively, if testing with the Vercel CLI:
   ```bash
   vercel dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start in production mode:
   ```bash
   npm start
   ```
