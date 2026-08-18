# Riadom API

NestJS backend for Riadom. See the [root README](../../README.md) and [architecture doc](../../docs/architecture.md) for monorepo setup.

## Structure

```
apps/api/src/
├── auth/           # Better Auth factory + Telegram OIDC hooks
├── config/         # Typed environment (Zod)
├── health/         # GET /api/health reference module
├── app.module.ts
└── main.ts
```

Auth routes are mounted at `/api/auth/*` by `@thallesp/nestjs-better-auth`. Domain modules (activities, friends, etc.) will follow the NestJS module pattern described in the architecture doc.

## Development

From the repo root:

```sh
pnpm dev:api
```

Or from this directory:

```sh
pnpm dev
```

Requires `.env` at the repo root with at least `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_API_KEY`. Start Postgres with `pnpm db:up` and run migrations with `pnpm exec turbo run db:migrate --filter=@repo/db`.

## Scripts

| Script        | Description              |
| ------------- | ------------------------ |
| `pnpm dev`    | Watch mode               |
| `pnpm build`  | Compile to `dist/`       |
| `pnpm start:prod` | Run compiled output  |
| `pnpm test`   | Unit tests               |
