# Riadom Architecture

Riadom follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react/) architecture: feature-based modules, unidirectional imports, and clean boundaries between shared code, features, and the app composition layer. The same principles apply to the NestJS backend.

For agent workflows, see [`.agents/skills/riadom-architecture/SKILL.md`](../.agents/skills/riadom-architecture/SKILL.md).

---

## Monorepo layout

```
riadom/
├── apps/
│   ├── web/          # Vite + React frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── contracts/    # Zod schemas shared by web + api
│   ├── ui/           # Design system (shadcn + Base UI)
│   ├── eslint-config/
│   ├── typescript-config/
│   └── prettier-config/
├── docs/
│   └── architecture.md
└── AGENTS.md           # Product identity + build overview
```

### Package roles

| Package           | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `@repo/contracts` | Single source of truth for API request/response shapes (Zod) |
| `@repo/ui`        | Design system primitives only — Button, Card, Section, theme |
| `apps/web`        | Product UI, feature modules, app composition                 |
| `apps/api`        | HTTP API, business logic, data access                        |

---

## Frontend (`apps/web`)

### Folder structure

```
apps/web/src/
├── app/
│   └── app.tsx                 # Composition root — wires features together
├── constants/
│   └── paths.ts                # Route path constants
├── components/                 # Shared, non-feature UI (layouts, errors)
├── features/
│   └── landing/
│       ├── components/
│       └── landing-page.tsx
├── hooks/                      # Shared hooks
├── lib/                        # Shared utilities (api-client when added)
├── types/                      # App types not in @repo/contracts
├── testing/                    # Test utils and mocks
└── main.tsx                    # Entry point
```

### Feature template

Create subfolders only when a feature needs them:

```
features/<name>/
├── api/          # Fetchers + hooks (when TanStack Query is added)
├── components/
├── hooks/
├── stores/       # Optional feature-local state
└── types/
```

### Import rules

Imports flow in one direction: **shared → features → app**.

1. **Features must not import from other features.** Compose different features in `app/`.
2. **Shared layers** (`components/`, `hooks/`, `lib/`, `config/`, `types/`) must not import from `features/` or `app/`.
3. **`app/`** may import from features and all shared layers.
4. **No barrel files** — import directly from the source file (e.g. `@/features/landing/landing-page`, not `@/features/landing`).

```typescript
// Good — app composes features
import { LandingPage } from '@/features/landing/landing-page';

// Bad — cross-feature import
import { AuthForm } from '@/features/auth/components/auth-form'; // from inside features/map/

// Bad — shared layer importing a feature
import { LandingPage } from '@/features/landing/landing-page'; // from hooks/use-something.ts
```

### Where does new frontend code go?

```
Is it a design system primitive (Button, Input, theme token)?
  → @repo/ui

Is it specific to one product area (map, auth, activities)?
  → features/<name>/

Is it shared across multiple features but not a design primitive?
  → apps/web/src/components/

Is it a shared hook?
  → apps/web/src/hooks/

Is it an API fetcher or client utility?
  → features/<name>/api/ or apps/web/src/lib/

Is it an API shape (request/response)?
  → @repo/contracts

Does it wire features together (routing, providers)?
  → apps/web/src/app/
```

### What stays in `@repo/ui`

Design system only. Do not put feature-specific UI, business logic, or app layouts in `@repo/ui`.

---

## Backend (`apps/api`)

### Folder structure

```
apps/api/src/
├── common/
│   ├── filters/                # Global exception filters
│   ├── guards/                 # Auth guards
│   ├── interceptors/
│   └── pipes/
├── config/
│   └── env.ts                  # Typed process.env
├── health/                     # Reference module
│   ├── health.controller.ts    # HTTP layer only
│   ├── health.service.ts       # Business logic
│   └── health.module.ts
├── app.module.ts
└── main.ts
```

### Module template

```
<feature>/
├── <feature>.module.ts
├── <feature>.controller.ts     # HTTP only — thin, delegates to service
├── <feature>.service.ts        # Business logic
└── <feature>.repository.ts     # Data access (when DB lands)
```

DTOs come from `@repo/contracts` via `nestjs-zod`:

```typescript
import { createZodDto } from 'nestjs-zod';
import { HealthResponseSchema } from '@repo/contracts/health';

class HealthResponseDto extends createZodDto(HealthResponseSchema) {}
```

### Backend principles

| Rule                           | Detail                                          |
| ------------------------------ | ----------------------------------------------- |
| Thin controllers               | Controllers handle HTTP; services hold logic    |
| No cross-module file imports   | Modules expose services via NestJS `exports`    |
| Contracts in `@repo/contracts` | Never duplicate API shapes in the api app       |
| Common for cross-cutting       | Filters, guards, interceptors live in `common/` |
| Unidirectional flow            | `common/` → feature modules → `app.module.ts`   |

---

## Contracts (`@repo/contracts`)

Add one file (or folder) per domain with a subpath export in `package.json`:

```
packages/contracts/src/
├── health.ts
├── activities/     # when built
└── index.ts
```

Both `apps/web` and `apps/api` import from the same schema. The web client validates responses; the api validates requests/responses via DTOs.

---

## Future libraries

Not installed yet. Add when the feature that needs them is built:

| Concern        | Recommended library                             |
| -------------- | ----------------------------------------------- |
| Routing        | `@tanstack/react-router`                        |
| Server cache   | `@tanstack/react-query`                         |
| API client     | Axios in `apps/web/src/lib/api-client.ts`       |
| Forms          | `react-hook-form` + `@hookform/resolvers` + Zod |
| App state      | `zustand`                                       |
| Backend config | `@nestjs/config`                                |
| Database       | Drizzle + PostGIS (maybe)                       |

When adding TanStack Query, follow the [Bulletproof API layer pattern](https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md): fetcher function → `queryOptions` → hook, colocated in `features/<name>/api/`.

---

## Product constraints

All architectural work must respect the product rules in [`AGENTS.md`](../AGENTS.md):

1. Map-first discovery
2. No in-app chat
3. Contact info gated behind approved activities
4. Location masked until approval
5. Trust & safety is core, not an add-on

---

## References

- [Bulletproof React](https://github.com/alan2207/bulletproof-react/) — project structure, API layer, state management
- [Bulletproof project structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- [NestJS modules](https://docs.nestjs.com/modules)
