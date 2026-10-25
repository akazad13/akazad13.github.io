# AGENTS.md — AI Agent Guidance & Repository Rules

This document provides mandatory guidance for autonomous AI coding agents (Antigravity, Claude Code, GitHub Copilot, Cursor, Windsurf, Devin) operating in `akazad13/akazad13.github.io`.

---

## 1. System Identity & Architecture

**Product**: `Md Abul Kalam's Portfolio` — Developer portfolio and showcase deployed to GitHub Pages at `https://akazad13.github.io/`.
- **Runtime**: React 19, Vite, TypeScript.
- **Styling**: Tailwind CSS v4, custom IBM Plex Sans / Bricolage Grotesque typography.
- **Deployment**: Automated GitHub Pages via `.github/workflows/deploy.yml`.
- **Theme**: System/Saved dark-mode with zero flash-of-unstyled-content (`dataset.theme` script in `index.html`).

### Project Layout (`src/`):
- `src/data/portfolio.ts`: Single source of truth for profile data, work history, projects, open-source repositories, and technical skills.
- `src/components/`:
  - `Hero.tsx`: Headline, bio, social links, and enlarged profile portrait.
  - `Experience.tsx`: Career timeline (Technical Lead, Senior Software Engineer).
  - `Projects.tsx`: Featured system design, enterprise SaaS, and open-source work.
  - `Skills.tsx`: Categorized competencies (.NET, Azure, React, Distributed Systems, DevOps).
  - `Contact.tsx`: Email and social contact triggers.
  - `Footer.tsx`: Minimal copyright footer.
- `src/types/portfolio.ts`: TypeScript contracts for portfolio entities.

---

## 2. Inviolable Architectural Invariants

1. **Portfolio Data Decoupling**:
   - Content and links must be edited in `src/data/portfolio.ts`. Do not hardcode custom project arrays or work experience directly in JSX components.
2. **Base URL Relative Paths**:
   - `vite.config.ts` specifies `base: './'`. All static asset paths must remain relative or root-compatible to function seamlessly on GitHub Pages.
3. **No Unused / Orphan Prototype Components**:
   - Keep the repository lean. Do not leave unreferenced modal or playground components in `src/components/`.
4. **Favicon Integrity**:
   - Both `/favicon.ico` in `public/` and `public/favicons/*` must be preserved for browser caching compatibility.

---

## 3. Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Run TypeScript check (lint)
npm run lint

# Production build
npm run build

# Preview build locally
npx vite preview --port 3000
```

---

## 4. Verification Gates for AI Agents

Before submitting code changes or finishing a turn:
1. Run `npm run lint` (`tsc --noEmit`) — must pass with **0 errors**.
2. Run `npm run build` — must build within 1 second.
3. Confirm that no secrets or API keys are added.
