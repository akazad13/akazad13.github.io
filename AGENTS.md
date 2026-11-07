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

## 2. Architecture Decisions & Inviolable Invariants

All architectural decisions and technical trade-offs are governed by formal Architecture Decision Records documented in [`docs/adr/README.md`](docs/adr/README.md).

1. **Architecture Decision Recording ([ADR-0000](docs/adr/0000-record-architecture-decisions.md))**:
   - Any architectural modifications, significant dependency changes, or structural shifts must be recorded in `docs/adr/` and indexed in `docs/adr/README.md`.
2. **Portfolio Data Decoupling**:
   - Content and links must be edited in `src/data/portfolio.ts`. Do not hardcode custom project arrays, work experience, or external links directly in JSX components.
3. **Base URL Relative Paths ([ADR-0001](docs/adr/0001-vite8-react19-modernization.md))**:
   - `vite.config.ts` specifies `base: './'`. All static asset paths must remain relative or root-compatible to function seamlessly on GitHub Pages.
4. **No Unused / Orphan Prototype Components**:
   - Keep the repository lean. Do not leave unreferenced modal or playground components in `src/components/`.
5. **Favicon Integrity**:
   - Both `/favicon.ico` in `public/` and `public/favicons/*` must be preserved for browser caching compatibility.
6. **Vite Client Types ([ADR-0001](docs/adr/0001-vite8-react19-modernization.md))**:
   - `src/vite-env.d.ts` must reference `vite/client` so CSS modules, SVG imports, and `import.meta.env` are strongly typed in Vite 8.
7. **Zero-Flicker Dark Mode**:
   - The inline pre-paint script in `index.html` must execute synchronously before rendering to ensure instant theme application without flashes of unstyled content (FOUC).
8. **Testing Paradigm & Agentic Verification ([ADR-0002](docs/adr/0002-testing-paradigm-and-agentic-verification.md))**:
   - All code changes must satisfy the three-pillar verification model: compile-time schema contracts, production build integrity, and zero-error browser runtime.

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

## 4. Testing Paradigm & Agentic Verification

In accordance with [ADR-0002](docs/adr/0002-testing-paradigm-and-agentic-verification.md) and the `test-driven-development` skill, the repository follows a three-pillar testing paradigm designed for high-velocity, deterministic agentic execution:

1. **Compile-Time Type & Schema Verification**:
   - Run `npm run lint` (`tsc --noEmit`).
   - Ensures `src/data/portfolio.ts` conforms strictly to `src/types/portfolio.ts`.
   - Validates component props and icon registry references in `src/components/Icons.tsx`.
2. **Build Artifact Integrity**:
   - Run `npm run build` (`tsc --noEmit && vite build`).
   - Confirms production bundling, Tailwind v4 compilation, and static asset generation in `dist/` within <1s (~350ms).
3. **Visual & DOM Runtime Verification**:
   - Verify UI behavior via Chrome DevTools MCP or local preview (`npm run preview`).
   - Invariants: **0 console errors/warnings**, responsive rendering across breakpoints, seamless theme switching without FOUC, and accessible `#resume` modal routing.

### Mandatory Pre-Submission Gates
Before concluding any task or committing changes:
- [ ] `npm run lint` exits with **0 errors**.
- [ ] `npm run build` succeeds cleanly.
- [ ] No hardcoded data bypasses `src/types/portfolio.ts`.
- [ ] Zero secrets or environment credentials are staged.
