---
name: riadom-architecture
description: >-
  Guides folder placement, import boundaries, and module structure in the Riadom
  monorepo (React/Vite frontend, NestJS backend). Use when adding features, API
  endpoints, components, moving files, or answering architecture questions in
  apps/web, apps/api, packages/contracts, or packages/ui.
---

# Riadom Architecture

Follow [Bulletproof React](https://github.com/alan2207/bulletproof-react/) structure. Full reference: [docs/architecture.md](../../docs/architecture.md).

## Quick rules

- **Unidirectional imports:** shared → features → app (frontend); common → modules → app.module (backend)
- **No cross-feature imports** — compose features in `app/`
- **No barrel files** — direct file imports only
- **kebab-case** for files and folders
- **`@repo/contracts`** for API shapes; **`@repo/ui`** for design system only

## Where to put new code

| What                 | Where                                         |
| -------------------- | --------------------------------------------- |
| Feature UI/logic     | `apps/web/src/features/<name>/`               |
| Shared app UI        | `apps/web/src/components/`                    |
| Design primitive     | `packages/ui/src/components/`                 |
| Shared hook          | `apps/web/src/hooks/`                         |
| API fetcher (future) | `features/<name>/api/` or `apps/web/src/lib/` |
| Route wiring         | `apps/web/src/app/`                           |
| API shape (Zod)      | `packages/contracts/src/<domain>.ts`          |
| NestJS endpoint      | `apps/api/src/<feature>/`                     |
| Guard/filter/pipe    | `apps/api/src/common/`                        |

## Adding a frontend feature

1. Create `apps/web/src/features/<name>/`
2. Add `components/` (and `api/`, `hooks/`, `types/`, `constants/` only when needed)
3. Export the page/view component from the feature root (e.g. `features/map/map-page.tsx`)
4. Import and compose it in `apps/web/src/app/app.tsx` (or future router)
5. Do **not** import from other features inside this feature

```
features/map/
├── components/
│   └── map-view.tsx
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
4. Use in web: import type or validate responses when api-client exists

## Anti-patterns

- Cross-feature imports (`features/map` importing from `features/auth`)
- Barrel files (`index.ts` re-exporting a feature)
- Business logic in NestJS controllers
- Feature-specific UI in `@repo/ui`
- Duplicating API types outside `@repo/contracts`
- Shared hooks/components importing from `features/` or `app/`

## State categories (when libraries are added)

| State type   | Where                      | Future library        |
| ------------ | -------------------------- | --------------------- |
| Component    | `useState` in component    | —                     |
| Server cache | `features/<name>/api/`     | TanStack Query        |
| URL          | route params/search        | react-router          |
| Forms        | feature components         | react-hook-form + Zod |
| App-global   | `stores/` or `components/` | zustand               |

Do not install these libraries unless the task explicitly requires them.

## Product constraints

Check changes against [`AGENTS.md`](../../AGENTS.md): map-first, no in-app chat, gated contact info, masked locations, trust & safety core.
