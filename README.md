# The World of Tirthesh — RPG Portfolio

A portfolio website that IS an RPG game. The entire portfolio is explored through HTML5 Canvas gameplay built with Next.js.

## What is this?

Instead of a traditional portfolio, this is a top-down RPG world where you explore zones to discover information about Tirthesh Dhaygude — Software Engineer from Mumbai.

## Zones

- **The Starting Village** — Meet the Realm Keeper (about me)
- **Academy of Knowledge** — Education and Certifications
- **Guild of Quests** — Work Experience
- **Forge of Artifacts** — Projects
- **Arsenal of Skills** — Technical Skills
- **Messenger's Inn** — Contact Information

## Controls

| Key | Action |
|-----|--------|
| WASD or Arrow Keys | Move character |
| E | Interact with nearby NPC |
| Enter | Advance dialogue |
| Escape | Close dialogue |

Mobile: On-screen D-pad and Talk button available on touch devices.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Deploy to Vercel

1. Push this repository to GitHub
2. Go to vercel.com and click New Project
3. Import the GitHub repository
4. Framework will be auto-detected as Next.js
5. No environment variables needed
6. Click Deploy

The site uses output: 'export' for static generation and works on any static host.

## Tech Stack

- Next.js 16 (App Router, Static Export)
- TypeScript (strict mode)
- HTML5 Canvas 2D API (no Phaser, no external images)
- Zustand (game state management)
- Framer Motion (UI transitions)
- Tailwind CSS v4
