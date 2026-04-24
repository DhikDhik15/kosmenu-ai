# KosMenu AI

AI meal planner untuk anak kos Indonesia. Dibuat dengan Next.js, Tailwind CSS, dan OpenRouter API.

## Fitur

- Generate menu 3 hari berdasarkan bahan, budget, alat masak, dan tujuan makan
- Estimasi budget
- Daftar belanja
- Alasan keputusan AI
- Branding: Komi si koki hemat

## Install

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Environment

Copy `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Deploy Vercel

1. Push project ke GitHub.
2. Import repo di Vercel.
3. Tambahkan Environment Variable `OPENROUTER_API_KEY`.
4. Deploy.
