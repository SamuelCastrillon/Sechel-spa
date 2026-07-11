# SECHEL

> OPEN_SOURCE_MEMORY_PROTOCOL // Serverless MCP memory server for AI coding agents.

**SECHEL** is the landing page (SPA) for [Sechel](https://github.com/SamuelCastrillon/Sechel), an open-source, self-hosted, MIT-licensed memory server built for AI coding agents. It exposes a Model Context Protocol (MCP) interface so agents can persist and recall structured memory across sessions.

This repository contains the marketing/landing site only — the protocol server lives in the main [`Sechel`](https://github.com/SamuelCastrillon/Sechel) repository.

## Features

- Cyber-brutalist terminal design system (dark, monospace-driven, high-contrast).
- Fully responsive single-page layout: hero, features, how-it-works, quickstart, API docs, footer.
- Built with Svelte 5, Vite, and Tailwind CSS v4.
- Zero runtime dependencies beyond the framework — static, fast, deploy-anywhere.

## Tech Stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | [Svelte 5](https://svelte.dev/) |
| Build tool   | [Vite](https://vite.dev/)       |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/) |
| Language     | TypeScript                      |
| Icons        | [lucide-svelte](https://lucide.dev/) |

## Getting Started

### Prerequisites

- Node.js 20+ (or compatible runtime)
- A package manager: `pnpm` (recommended), `npm`, or `yarn`

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the Vite dev server with HMR at `http://localhost:5173`.

### Build

```bash
pnpm build
```

Outputs a static production bundle to `dist/`.

### Preview

```bash
pnpm preview
```

Serves the built `dist/` locally for final verification.

## Project Structure

```
src/
├── App.svelte          # Page composition (Navbar → sections → Footer)
├── app.css             # Tailwind import + Sechel design tokens
├── main.ts             # App entry point
├── data/               # Static content (navigation, features, quickstart)
├── lib/                # Section components (Hero, Footer, ApiDocs, ...)
└── types.ts            # Shared TypeScript types
```

## Links

- **Sechel server repo:** https://github.com/SamuelCastrillon/Sechel
- **Author:** [Samuel Castrillón](https://github.com/SamuelCastrillon) · [LinkedIn](https://www.linkedin.com/in/samuel-castrill%C3%B3n/)

## License

MIT — see the main [`Sechel`](https://github.com/SamuelCastrillon/Sechel) repository for details.
