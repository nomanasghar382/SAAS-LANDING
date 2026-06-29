# SellPilot AI

AI-powered sales automation SaaS platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** Shadcn-style components
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Animation:** Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/           # Next.js routes and layouts
components/    # Shared UI and layout components
features/      # Domain-specific modules
hooks/         # Reusable React hooks
lib/           # Core infrastructure
utils/         # Pure helper functions
types/         # TypeScript definitions
constants/     # App-wide constants
services/      # Data access layer
store/         # Zustand global state
styles/        # Design tokens and animations
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript checks
