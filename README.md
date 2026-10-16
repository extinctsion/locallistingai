# LocalListing AI

> **Hacktoberfest 2026 · Side Hustle Challenge** — Powered by Gemma 3 & Ollama

Turn a raw product photo into a complete, ready-to-publish listing in seconds. Built for small business owners, Instagram sellers, home bakers, and boutique artisans.

---

## What it does

Upload a product image (or paste a data URL), fill in optional hints, and LocalListing AI generates:

| Output | Description |
|---|---|
| **Title** | SEO-optimised product title |
| **Description** | High-converting product description |
| **Keywords** | Searchable keyword tags |
| **Social Caption** | Instagram / Facebook caption with hashtags |
| **WhatsApp Message** | Ready-to-send sales pitch |
| **Hindi Translation** | Native-quality translation of all the above |
| **Missing Details** | Details the model noticed were absent from the input |
| **Visual Features** | Auto-detected visual attributes from the photo |

The model is instructed never to invent claims — it only describes what it can see or what you tell it.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 + Tailwind CSS v4 |
| Icons | Lucide React |
| Validation | Zod v4 |
| AI (local) | Ollama → `gemma3:4b` (default) |
| AI (cloud) | Any OpenAI-compatible API (e.g. OpenRouter) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing / marketing page
│   ├── studio/               # /studio route — listing generator UI
│   │   ├── page.tsx
│   │   └── StudioClient.tsx
│   └── api/generate/
│       └── route.ts          # POST /api/generate  ← AI inference endpoint
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── StudioForm.tsx        # Product input form
│   ├── ListingResults.tsx    # Generated listing display
│   ├── ListingPreviewCard.tsx
│   ├── ImageUploader.tsx
│   ├── WhatsAppPreview.tsx
│   ├── AiStatusBadge.tsx     # Live Ollama / hosted provider status indicator
│   └── CopyButton.tsx
└── lib/
    ├── ai/
    │   ├── index.ts           # Provider selector (Ollama vs Hosted)
    │   ├── provider.ts        # Shared provider interface
    │   ├── ollama-provider.ts # Local Ollama inference
    │   ├── hosted-provider.ts # OpenAI-compatible cloud inference
    │   └── prompts.ts         # System prompt + user prompt builder
    ├── types/listing.ts       # TypeScript interfaces
    ├── validation/            # Zod input + output schemas
    └── data/                  # Sample products for demo mode
tests/
└── validation-and-parsing.test.mjs  # Node built-in test runner
```

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **Ollama** installed and running locally — [ollama.com](https://ollama.com)

### 1. Install dependencies

```bash
npm install
```

### 2. Pull the vision model

```bash
ollama pull gemma3:4b
```

> Any Ollama vision model works. Set `OLLAMA_MODEL` in `.env.local` to use a different one (e.g. `llava:7b`, `gemma3:12b`).

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# ── Ollama (local inference, default) ──────────────────────────────
OLLAMA_BASE_URL=http://127.0.0.1:11434   # default
OLLAMA_MODEL=gemma3:4b                   # default
OLLAMA_TIMEOUT_MS=120000                 # default (2 minutes)

# ── Hosted / Cloud inference (optional) ────────────────────────────
# Set AI_PROVIDER=hosted OR provide HOSTED_AI_API_KEY to switch.
# AI_PROVIDER=hosted
# HOSTED_AI_API_KEY=sk-...
# HOSTED_AI_BASE_URL=https://openrouter.ai/api/v1   # default
# HOSTED_AI_MODEL=google/gemma-3-27b-it             # default
# HOSTED_AI_TIMEOUT_MS=60000                         # default
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## AI Provider Modes

The app selects a provider at runtime based on environment variables:

| Condition | Provider used |
|---|---|
| `AI_PROVIDER=ollama` (or no env vars set) | **Ollama** — local, private, free |
| `AI_PROVIDER=hosted` | **Hosted** — cloud, OpenAI-compatible API |
| `HOSTED_AI_API_KEY` set and `AI_PROVIDER` ≠ `ollama` | **Hosted** — auto-detected |

The `AiStatusBadge` component shows a live health check of whichever provider is active.

---

## API Reference

### `POST /api/generate`

Accepts `multipart/form-data` or `application/json`.

**Fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `imageDataUrl` | `string` | ✅ | `data:image/jpeg;base64,...` (JPEG / PNG / WebP / AVIF, ≤ 5 MB) |
| `image` | `File` | — | Multipart file upload (converted to data URL server-side) |
| `productName` | `string` | — | e.g. `"Handmade Brass Diya"` |
| `category` | `enum` | ✅ | `Clothing`, `Food`, `Jewellery`, `Home and Kitchen`, `Beauty`, `Electronics Accessories`, `Other` |
| `knownFeatures` | `string` | — | Free-text product details |
| `targetAudience` | `string` | — | e.g. `"Pooja shoppers, gift buyers"` |
| `price` | `string` | — | e.g. `"₹1,249"` |
| `brandName` | `string` | — | e.g. `"ArtisanCraft Co."` |
| `tone` | `enum` | — | `Friendly` (default), `Premium`, `Minimal`, `Playful`, `Professional` |
| `primaryLanguage` | `string` | — | `English` (default) |
| `translationLanguages` | `string[]` | — | `["Hindi"]` (default) |

**Success response:**

```json
{
  "success": true,
  "data": {
    "title": "...",
    "description": "...",
    "keywords": ["..."],
    "socialCaption": "...",
    "whatsappMessage": "...",
    "translations": { "Hindi": { "language": "Hindi", "title": "...", "description": "...", "socialCaption": "..." } },
    "missingDetails": ["..."],
    "detectedVisualFeatures": ["..."]
  },
  "meta": {
    "provider": "Ollama (Local)",
    "model": "gemma3:4b",
    "durationMs": 8432
  }
}
```

---

## Running Tests

```bash
npm test
```

Uses Node's built-in test runner (no extra test dependencies). Covers:

- ✅ Input schema validation — valid inputs, unsupported MIME types, invalid categories
- ✅ Output schema validation — complete responses, incomplete AI output
- ✅ JSON extraction from LLM responses — markdown fenced blocks, trailing commas

---

## Supported Categories & Tones

**Categories:** `Clothing` · `Food` · `Jewellery` · `Home and Kitchen` · `Beauty` · `Electronics Accessories` · `Other`

**Tones:** `Friendly` · `Premium` · `Minimal` · `Playful` · `Professional`

---

## Deployment

For cloud deployment without a local Ollama instance:

1. Set `HOSTED_AI_API_KEY` to your API key (e.g. from [OpenRouter](https://openrouter.ai))
2. Optionally set `HOSTED_AI_MODEL` to your preferred vision model
3. Deploy to any Node.js host — no Ollama installation required on the server

```bash
npm run build
npm start
```

---

## License

MIT
