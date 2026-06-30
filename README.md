# Snip »»

A fast, no-clutter URL shortener. Paste a long link, get a short one back, and track clicks — with optional accounts for custom slugs, link expiry, and a personal dashboard.

```
https://example.com/a/very/long/path?with=params  »»  snip.app/x7f2a9
```

## Features

- **Instant shortening** — no account needed for a quick link
- **Accounts** — sign up to unlock custom slugs and a dashboard of your links
- **Custom slugs** — pick your own short code (`snip.app/my-launch`)
- **Click tracking** — see how many times each link has been opened
- **Link expiry** — set links to auto-expire after 1, 7, or 30 days
- **Secure by default** — rate limiting, input validation, and short-lived access tokens with silent refresh

## Tech stack

**Frontend** — React 19, Redux Toolkit, TanStack Router & Query, Tailwind CSS, Axios, Vite

**Backend** — Node.js, Express 5, MongoDB (Mongoose), JWT auth (access + refresh tokens), Zod validation, express-rate-limit

## Project structure

```
snip/
├── frontend/   React app (UI, routing, state)
└── backend/    Express API (auth, link creation, redirects)
```

Each folder has its own `README.md` with setup details.

## Quick start

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env   # fill in your Mongo URI and JWT secrets
npm run dev
```

Runs on `http://localhost:3000`.

**2. Frontend**

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:3000" > .env
npm run dev
```

Runs on `http://localhost:5173`.

## How it works

1. A user submits a long URL (and optionally a custom slug + expiry).
2. The backend generates a short, unique code (via `nanoid`) or uses the custom slug, and stores the mapping in MongoDB.
3. Visiting `snip.app/<code>` looks up the original URL and redirects there, incrementing the click counter — unless the link has expired.
4. Logged-in users can view and manage all their links from the dashboard.

## License

MIT
