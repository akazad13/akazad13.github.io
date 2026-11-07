# ADR-0002: Testing Paradigm and Agentic Verification

## Status
Accepted

## Date
2026-11-07

## Context
As an autonomous AI-driven, statically generated portfolio built with React 19, Vite, and Tailwind CSS v4, the repository has no server-side backend, database, or external microservice dependencies. All content, metadata, and configuration reside in typed static structures (`src/data/portfolio.ts`).

Traditional software testing strategies often default to heavy component unit testing suites (e.g., Jest/Vitest with jsdom mocking). In a static showcase website, simulated DOM mocks introduce maintenance overhead and false confidence while failing to catch real-world CSS layout regressions, asset path issues, or browser runtime failures.

To support rapid, deterministic development by autonomous AI coding agents (Antigravity, Claude Code, Cursor) and human maintainers, we need a formalized testing paradigm grounded in the `test-driven-development` and `documentation-and-adrs` skills.

## Decision
We adopt a three-pillar **Static Web & Agentic Verification Paradigm**:

### 1. Pillar 1: Compile-Time Type & Schema Verification
- **Command**: `npm run lint` (`tsc --noEmit`)
- **Mechanism**: TypeScript 5.8+ strict mode validates the entire codebase.
- **Contract Enforcement**: All data in `src/data/portfolio.ts` must strictly conform to schemas defined in `src/types/portfolio.ts` (`Portfolio`, `Profile`, `Employer`, `Project`, `SkillGroup`, `PortfolioData`, etc.).
- **Registry Safety**: Component props, Lucide icon keys in `src/components/Icons.tsx`, and asset references are validated at compile time.

### 2. Pillar 2: Build Artifact Integrity Verification
- **Command**: `npm run build` (`tsc --noEmit && vite build`)
- **Mechanism**: Vite production bundler exercises the full compilation pipeline:
  - Module resolution and tree-shaking across all components.
  - Tailwind CSS v4 compilation and CSS variable token resolution.
  - Relative asset path resolution (`base: './'`) for GitHub Pages compatibility.
  - Emits distribution artifacts in `dist/` in under 1 second (~350ms).

### 3. Pillar 3: Visual & DOM Runtime Verification (DevTools MCP)
- **Tooling**: Chrome DevTools MCP and browser preview (`npm run preview` / local dev server).
- **Mechanism**: Real browser runtime inspection:
  - **Zero Console Errors**: No exceptions, 404s, or unhandled warnings in the browser console.
  - **DOM & Accessibility**: Semantic HTML validation, keyboard focus management, and screen-reader accessibility (e.g. competitive programming table fallback).
  - **Theme Engine**: Synchronous pre-paint theme execution in `index.html` with zero flash of unstyled content (FOUC).
  - **Modal Routing**: Direct hash navigation verification (e.g. `#resume` opening ATS resume modal).

### Inviolable Invariants
1. **Schema Contracts**: Content must never bypass `src/types/portfolio.ts`. No untyped or loose data structures.
2. **Clean Console**: Runtime browser logs must remain at zero errors and zero warnings.
3. **Sub-Second Feedback Loop**: Verification commands (`npm run lint`, `npm run build`) must execute in under 1 second, providing autonomous agents with instant deterministic feedback.

## Alternatives Considered

### Full Vitest / React Testing Library Suite with jsdom
- *Pros*: Standard React unit test pattern.
- *Cons*: Heavy node_modules weight, slow test runs, jsdom does not evaluate actual Tailwind layout, CSS grid, print stylesheets, or real canvas confetti effects. Mocking the DOM often tests implementation details rather than real user outcomes.
- *Rejected*: Inverted cost-to-confidence ratio for a static data-driven portfolio.

### Manual-Only Visual Verification
- *Pros*: Zero upfront documentation.
- *Cons*: Non-deterministic, prone to agent regressions, unverified links and schemas.
- *Rejected*: Fails autonomous agent verification requirements.

## Consequences
- **Fast Agent Verification Loop**: AI agents can run `npm run lint` and `npm run build` within seconds to prove changes before proposing commits.
- **High Contract Rigor**: Changes to data structures instantly surface type errors across all consuming components.
- **Reliable Deployments**: Automated GitHub Actions deployment (`.github/workflows/deploy.yml`) mirrors local build gates with zero deployment surprises.
