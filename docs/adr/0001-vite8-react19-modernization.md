# ADR-0001: Vite 8, React 19, and Tailwind v4 Modernization

## Status
Accepted

## Date
2026-11-07

## Context
The portfolio site was migrated to Vite 8, React 19, and Tailwind CSS v4 to leverage faster compilation, smaller client bundles, and enhanced theme variables.

During the upgrade:
- TypeScript 7 strict checks required explicit Vite client type declarations (`/// <reference types="vite/client" />`) in `src/vite-env.d.ts` to allow side-effect CSS imports without compiler errors.
- Tailwind CSS v4 CSS variables were aligned with the custom typography and dark-mode toggle scripts.

## Decision
1. **Maintain `src/vite-env.d.ts`**: Keep Vite ambient client types included in the compilation scope.
2. **Optimize Static Build**: Retain relative base URL (`base: './'`) for flawless GitHub Pages static artifact generation.

## Consequences
- Fast HMR with Vite 8.
- Typecheck passes with zero warnings (`npm run lint`).
- Clean static output in `dist/`.
