---
name: riadom-architecture
description: >-
  Guides folder placement, import boundaries, and module structure in the Riadom
  monorepo (React/Vite frontend, NestJS backend). Use when adding features, API
  endpoints, components, moving files, or answering architecture questions in
  apps/web, apps/api, packages/contracts, packages/db, or packages/ui.
---

# Riadom Architecture

Follow [Bulletproof React](https://github.com/alan2207/bulletproof-react/) structure. Full reference: [docs/architecture.md](../../docs/architecture.md).

## Quick rules

- **Unidirectional imports:** shared → features → app (frontend); common → modules → app.module (backend)
- **No cross-feature imports** — compose features in `app/routes/`
- **No barrel files** — direct file imports only
- **kebab-case** for files and folders
- **`@repo/contracts`** for API shapes; **`@repo/ui`** for design system only; **`@repo/db`** for Drizzle schema and client

## Where to put new code

| What                 | Where                                         |
| -------------------- | --------------------------------------------- |
| Feature UI/logic     | `apps/web/src/features/<name>/`               |
| Route-facing page    | `features/<name>/pages/<name>-page.tsx`       |
| Shared app UI        | `apps/web/src/components/`                    |
| Design primitive     | `packages/ui/src/components/`                 |
| Shared hook          | `apps/web/src/hooks/`                         |
| API fetcher / query  | `features/<name>/api/`                        |
| Auth client          | `features/auth/api/`                          |
| Route wiring         | `apps/web/src/app/routes/`                    |
| API shape (Zod)      | `packages/contracts/src/<domain>.ts`          |
| DB schema / migration| `packages/db/src/db/`                         |
| NestJS endpoint      | `apps/api/src/<feature>/`                     |
| Better Auth config   | `apps/api/src/auth/`                          |
| Guard/filter/pipe    | `apps/api/src/common/`                        |

## Adding a frontend feature

1. Create `apps/web/src/features/<name>/`
2. Add `pages/`, `components/`, and `api/`, `hooks/`, `types/`, `constants/`, `utils/` only when needed
3. Add a route file in `apps/web/src/app/routes/` that imports the page component
4. Do **not** import from other features inside this feature

```
features/map/
├── components/
│   └── map-view.tsx
└── pages/
    └── map-page.tsx
```

## Adding a backend module

1. Create `apps/api/src/<feature>/`
2. Add `<feature>.module.ts`, `<feature>.controller.ts`, `<feature>.service.ts`
3. Keep controller thin — delegate to service
4. Register module in `app.module.ts`
5. Add Zod schema to `@repo/contracts`, use `createZodDto` in controller

Reference: [`apps/api/src/health/`](../../apps/api/src/health/)

```typescript
// health.controller.ts — thin
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth();
  }
}
```

## Adding a contract

1. Add schema in `packages/contracts/src/<domain>.ts`
2. Export subpath in `packages/contracts/package.json` (e.g. `"./activities"`)
3. Use in api: `createZodDto(Schema)` for DTOs
4. Use in web: import type or validate responses

## Anti-patterns

- Cross-feature imports (`features/map` importing from `features/auth`)
- Barrel files (`index.ts` re-exporting a feature)
- Business logic in NestJS controllers
- Feature-specific UI in `@repo/ui`
- Duplicating API types outside `@repo/contracts`
- Shared hooks/lib importing from `features/` or `app/`
- Editing `routeTree.gen.ts` by hand

## State categories

| State type   | Where                      | Library               |
| ------------ | -------------------------- | --------------------- |
| Component    | `useState` in component    | —                     |
| Server cache | `features/<name>/api/`     | TanStack Query        |
| URL          | `app/routes/`              | TanStack Router       |
| Forms        | feature components         | react-hook-form (TBD) |
| App-global   | `stores/` or `components/` | zustand (TBD)         |

## Product constraints

Check changes against [`AGENTS.md`](../../AGENTS.md): map-first, no in-app chat, gated contact info, masked locations, trust & safety core.
