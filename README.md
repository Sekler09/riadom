# riadom

**riadom** is a mobile-first web app where people meet new people by **joining real-world activities together** — a pickup game, a hike, a study session, a concert meetup — instead of swiping through profiles first. You discover activities on a map, request or instantly join one, get approved, and meet offline.

There is no in-app chat. Once approved onto an activity, people can see each other's social handles (Telegram, Instagram, WhatsApp, Discord, and others) and continue the conversation on whichever platform they actually use. A persistent Friends list keeps track of people you've met across different activities.

The product should never feel like a dating app: no swiping, no profile-photo carousels, no DM-first browsing. The activity is the reason people talk to each other, not a profile.

## Tech stack

| Layer              | Stack                                               |
| ------------------ | --------------------------------------------------- |
| Frontend           | React 19, Vite, Tailwind CSS 4, shadcn/ui + Base UI |
| Backend            | NestJS                                              |
| Shared contracts   | Zod (`@repo/contracts`)                             |
| Database (planned) | Postgres + PostGIS                                  |
| Auth (planned)     | Google / Apple OAuth                                |
| Monorepo           | Turborepo + pnpm workspaces                         |

Architecture follows [Bulletproof React](https://github.com/alan2207/bulletproof-react/) conventions — feature-based modules, unidirectional imports, shared contracts. See [docs/architecture.md](docs/architecture.md) for folder layout and import rules.

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
└── AGENTS.md         # Product identity and agent context
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) 9 (see `packageManager` in root `package.json`)

## Getting started

Install dependencies from the repo root:

```sh
pnpm install
```

### Development

Run both apps:

```sh
pnpm dev
```

Or run them individually (each also watches `@repo/contracts`):

```sh
pnpm dev:web   # frontend at http://localhost:3000
pnpm dev:api   # backend at http://localhost:4000
```

The web dev server proxies `/api` requests to the backend. The API uses a global `/api` prefix (e.g. `GET /api/health`).

### Other commands

```sh
pnpm build          # build all apps and packages
pnpm lint           # lint all packages
pnpm check-types    # typecheck all packages
pnpm format         # format with Prettier
pnpm format:check   # check formatting
```

Filter to a single app or package with Turborepo:

```sh
pnpm exec turbo run dev --filter=web
pnpm exec turbo run build --filter=api
```

## Environment variables

The API reads optional env vars (defaults shown):

| Variable      | Default                 | Description                         |
| ------------- | ----------------------- | ----------------------------------- |
| `PORT`        | `4000`                  | API listen port                     |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed CORS origin for the web app |

## Product principles

These constraints define what Riadom is — not incidental implementation details:

1. **Map-first discovery** — the map is the home screen, not a buried settings feature.
2. **No in-app chat** — contact happens off-platform, after approval.
3. **Contact info is gated** — social handles are only visible to people who share an approved activity.
4. **Location is masked until approval** — exact coordinates are never shown before approval.
5. **Trust & safety is core** — reporting, blocking, and verification are first-class, not later add-ons.

See [AGENTS.md](AGENTS.md) for the full product context.

## Documentation

- [Architecture](docs/architecture.md) — monorepo layout, import rules, module templates
- [AGENTS.md](AGENTS.md) — product identity and build overview for contributors and agents
