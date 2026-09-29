# croupier-frontend

This is the separate Vercel frontend for Croupier. The landing page is built with
[Next.js](https://nextjs.org) and [v0](https://v0.app). The `/demo` route now
links to the real, server-owned Blackjack pilot at
`https://croupier-v2.onrender.com/blackjack?dealer=astrid`. Render owns cards,
shoe, balance, payouts, authentication, BO and Lab. The legacy client-only
`BlackjackGame` component is not used by the public route.

The full same-origin Vercel player frontend and proxy remain a separate migration.
Before switching that on, use an isolated Render test backend and verify cookies,
origin checks, media Range responses and a complete browser round. See the
Croupier monorepo's `docs/VERCEL-FRONTEND-MIGRATION.md`.

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_3zsY4c8kKQMp9CeHuwHVgy1tFLAs)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
