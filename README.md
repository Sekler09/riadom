# riadom

**riadom** is a mobile-first web app where people meet new people by **joining real-world activities together** — a pickup game, a hike, a study session, a concert meetup — instead of swiping through profiles first. You discover activities on a map, request or instantly join one, get approved, and meet offline.

There is no in-app chat. Once approved onto an activity, people can see each other's social handles (Telegram, Instagram, WhatsApp, Discord, and others) and continue the conversation on whichever platform they actually use. A persistent Friends list keeps track of people you've met across different activities.

The product should never feel like a dating app: no swiping, no profile-photo carousels, no DM-first browsing. The activity is the reason people talk to each other, not a profile.

## Tech stack

| Layer            | Stack                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Frontend         | React 19, Vite, Tailwind CSS 4, shadcn/ui + Base UI                   |
| Routing          | TanStack Router (file-based routes)                                   |
| Server cache     | TanStack Query                                                        |
| Backend          | NestJS                                                                |
| Auth             | Better Auth + Telegram OIDC (`@thallesp/nestjs-better-auth`)          |
| Database         | Postgres 16 (Docker), Drizzle ORM (`@repo/db`)                        |
| Shared contracts | Zod (`@repo/contracts`)                                               |
| Monorepo         | Turborepo + pnpm workspaces                                           |

Architecture follows [Bulletproof React](https://github.com/alan2207/bulletproof-react/) conventions — feature-based modules, unidirectional imports, shared contracts. See [docs/architecture.md](docs/architecture.md) for folder layout and import rules.

## Monorepo layout

```
riadom/
├── apps/
│   ├── web/                    # Vite + React frontend
│   └── api/                    # NestJS backend
├── packages/
│   ├── contracts/              # Zod schemas shared by web + api
│   ├── db/                     # Drizzle schema, migrations, DB client
│   ├── ui/                     # Design system (shadcn + Base UI)
│   ├── eslint-config/
│   ├── typescript-config/
│   └── prettier-config/
├── scripts/                    # Dev helpers (e.g. ngrok)
├── docs/
│   └── architecture.md
├── docker-compose.yml          # Postgres (+ optional ngrok profile)
├── .env.example
└── AGENTS.md                   # Product identity and agent context
```

### What exists today

| Area      | Status                                                                 |
| --------- | ---------------------------------------------------------------------- |
| Landing   | Marketing page at `/`                                                  |
| Auth      | Telegram OIDC sign-in/sign-up, profile page at `/profile`               |
| API       | Health check, Better Auth routes under `/api/auth/*`                   |
| Database  | Better Auth tables (user, session, account, verification) via Drizzle  |

Map, activities, friends, and trust & safety features are not built yet.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) 9 (see `packageManager` in root `package.json`)
- [Docker](https://www.docker.com/) for local Postgres

## Getting started

Install dependencies from the repo root:

```sh
pnpm install
```

Copy environment variables and adjust as needed:

```sh
cp .env.example .env
```

Start Postgres (matches `docker-compose.yml` defaults: `riadom` / `riadom` / `riadom`):

```sh
pnpm db:up
```

Apply database migrations:

```sh
pnpm exec turbo run db:migrate --filter=@repo/db
```

### Development

Run both apps:

```sh
pnpm dev
```

Or run them individually:

```sh
pnpm dev:web   # frontend at http://localhost:3000 (watches @repo/contracts)
pnpm dev:api   # backend at http://localhost:4000 (watches @repo/contracts, @repo/db)
```

The web dev server proxies `/api` to the backend. The API uses a global `/api` prefix (e.g. `GET /api/health`, `POST /api/auth/...`).

For Telegram OIDC over HTTPS locally, see [Environment variables](#environment-variables) and `.env.example` (`NGROK_DOMAIN`, `pnpm ngrok:up`).

### Other commands

```sh
pnpm build          # build all apps and packages
pnpm lint           # lint all packages
pnpm check-types    # typecheck all packages
pnpm format         # format with Prettier
pnpm format:check   # check formatting
pnpm db:down        # stop Postgres container
```

Database (run from repo root via Turborepo filter):

```sh
pnpm exec turbo run db:generate --filter=@repo/db   # generate migration after schema change
pnpm exec turbo run db:migrate --filter=@repo/db    # apply migrations
pnpm exec turbo run db:studio --filter=@repo/db     # Drizzle Studio
```

Filter to a single app or package:

```sh
pnpm exec turbo run dev --filter=web
pnpm exec turbo run build --filter=api
```

## Environment variables

Copy `.env.example` to `.env` at the repo root. The API loads from the repo root and from `apps/api/.env`.

| Variable                     | Required | Default                 | Description                                      |
| ---------------------------- | -------- | ----------------------- | ------------------------------------------------ |
| `DATABASE_URL`               | yes      | —                       | Postgres connection string                       |
| `BETTER_AUTH_SECRET`         | yes      | —                       | Auth signing secret (`openssl rand -base64 32`)  |
| `BETTER_AUTH_API_KEY`        | yes      | —                       | Better Auth Infrastructure dashboard key         |
| `BETTER_AUTH_URL`            | no       | `http://localhost:4000` | Public API base URL for auth callbacks           |
| `TELEGRAM_OIDC_CLIENT_ID`    | for OIDC | —                       | From BotFather → Web Login → OpenID Connect      |
| `TELEGRAM_OIDC_CLIENT_SECRET`| for OIDC | —                       | Telegram OIDC client secret                      |
| `TELEGRAM_BOT_TOKEN`         | no       | —                       | Telegram bot token (optional plugin config)      |
| `TELEGRAM_BOT_NAME`          | no       | —                       | Telegram bot username                            |
| `NGROK_DOMAIN`               | no       | —                       | Enables HTTPS tunnel for Telegram OIDC dev       |
| `NGROK_AUTHTOKEN`            | for ngrok| —                       | ngrok authtoken                                  |
| `CORS_ORIGIN`                | no       | `http://localhost:3000` | Allowed browser origin for the web app           |
| `PORT`                       | no       | `4000`                  | API listen port                                  |

When `NGROK_DOMAIN` is set, the API automatically trusts `https://<NGROK_DOMAIN>` and uses it as the Better Auth base URL. BotFather redirect URL:

```
https://<NGROK_DOMAIN>/api/auth/callback/telegram-oidc
```

## Product principles

These constraints define what Riadom is — not incidental implementation details:

1. **Map-first discovery** — the map is the home screen, not a buried settings feature.
2. **No in-app chat** — contact happens off-platform, after approval.
3. **Contact info is gated** — social handles are only visible to people who share an approved activity.
4. **Location is masked until approval** — exact coordinates are never shown before approval.
5. **Trust & safety is core** — reporting, blocking, and verification are first-class, not later add-ons.

See [AGENTS.md](AGENTS.md) for the full product context.

## Documentation

- [Architecture](docs/architecture.md) — monorepo layout, import rules, routing, auth, database
- [AGENTS.md](AGENTS.md) — product identity and build overview for contributors and agents
