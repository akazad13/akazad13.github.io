# ADR-0003: Technical Leadership & System Architecture Showcase

## Status
Accepted

## Date
2026-11-07

## Context
The portfolio is designed to showcase Md Abul Kalam's caliber as a Software Technical Lead specializing in .NET, Azure, distributed systems, and healthcare SaaS. 

Traditional portfolio layouts often reduce technical capability to flat bulleted lists of frameworks and project links. For executive reviewers (Engineering Directors, VP of Engineering, CTOs), evaluating a Technical Lead requires visibility into:
1. High-level leadership and scale metrics.
2. System design thinking, message flow pipelines, and architectural trade-offs.
3. Engineering leadership philosophy, quality standards, and developer enablement.

All changes must strictly adhere to repository invariants ([ADR-0000](0000-record-architecture-decisions.md) and [ADR-0002](0002-testing-paradigm-and-agentic-verification.md)), specifically portfolio data decoupling in `src/data/portfolio.ts` with TypeScript contracts in `src/types/portfolio.ts`.

## Decision
We introduce three complementary showcases into the core portfolio layout:

### 1. Executive Impact & Scale Metrics (`ImpactMetrics.tsx`)
- Placed immediately below the Hero section.
- Displays four key impact pillars:
  - Team Leadership (`7+ Devs` mentored and led).
  - Production Systems (`8+ Years` of enterprise .NET & Azure cloud systems).
  - Service Reliability (`99.9%` uptime SLA on healthcare SaaS).
  - Healthcare Compliance (`HIPAA` compliant delivery).
- Strictly omits academic/research metrics to keep focus squarely on enterprise engineering leadership.

### 2. Interactive System Architecture Case Studies (`Architecture.tsx`)
- Placed after Experience in the main scroll rhythm (`#architecture`).
- Features three interactive case studies drawn from real enterprise domains:
  - *Multi-Tenant Embedded Payments & Ledgering* (Transactional Outbox, EF Core + PostgreSQL, Stripe Webhooks, Azure Service Bus).
  - *Healthcare SaaS Monolith to Azure Cloud Migration* (Strangler Fig pattern, Azure Container Apps, Redis distributed caching, zero-downtime database replication).
  - *Real-Time Clinical Communication & Alerting Platform* (SignalR with Redis backplane, Twilio automated escalation, Cosmos DB partitioning).
- Implements tabbed navigation, sequential message flow pipelines with step-level tech tags, and explicit "Key Decisions & Trade-Offs" cards.

### 3. Engineering Leadership & Philosophy (`Leadership.tsx`)
- Placed after Architecture (`#leadership`).
- Structures four leadership pillars:
  - Pragmatic Architecture & Trade-Offs.
  - Quality as a Living Culture (automated SonarQube gates, Testcontainers).
  - Developer Velocity & Internal Tooling (DML refresh tooling, diagnostic inspectors, agentic AI workflows).
  - Empathetic Mentorship & Team Growth.

### 4. Data Contracts & Navigation
- All structures are typed via `ImpactMetric`, `ArchitectureCaseStudy`, `ArchitectureFlowStep`, `ArchitectureTradeoff`, and `LeadershipPillar` in `src/types/portfolio.ts`.
- Content is fully decoupled into `src/data/portfolio.ts`.
- Navigation in `Header.tsx` is updated with responsive sizing to comfortably accommodate `#architecture` and `#leadership`.

## Consequences

### Positive
- Clearly communicates senior technical leadership capability to engineering directors and hiring teams.
- Demonstrates distributed systems thinking, event-driven pipelines, and architectural trade-offs.
- Fully adheres to existing Tailwind v4 theme tokens, zero-flicker dark mode, and sub-300ms Vite build speeds.

### Compliance & Invariants
- `npm run lint` passes with 0 errors.
- `npm run build` succeeds in <300ms.
- 100% of content resides in `src/data/portfolio.ts`.
