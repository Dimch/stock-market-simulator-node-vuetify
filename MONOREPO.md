# Stock Market Simulator Monorepo Guide

This repository is organized as a workspace monorepo with one frontend package and one backend package.

## Quick Start

Install dependencies:

```bash
npm install
```

Run both apps directly on the host:

```bash
npm run dev
```

Or run the Docker-based development stack:

```bash
npm run docker:build
npm run docker:up
```

Default endpoints:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- PostgreSQL (Docker Compose only): `localhost:5432`

Choose the workflow based on what you need:

- Use `npm run dev` when you want the simplest local setup. In this mode, the backend falls back to its default in-memory SQLite implementation.
- Use Docker when you want both apps running in containers while editing source files on the host. In Compose mode, the backend switches to PostgreSQL via `DB=pg` and the stack starts a dedicated database container for you.

## Structure

```text
.
├── docker-compose.yaml
├── package.json
├── turbo.json
└── packages/
    ├── backend/
    │   ├── database/
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── src/
    │   └── test/
    └── frontend/
        ├── Dockerfile
        ├── package.json
        ├── src/
        └── vite.config.mjs
```

## Packages

### Backend

Location: `packages/backend`

The backend owns the API surface, authentication, admin-facing operations, stock simulation logic, and tests.

Use this package when you are changing routes, auth flows, stock simulation behavior, or backend tests.

Useful commands:

```bash
cd packages/backend
npm run dev
npm run start
npm run test
npm run test:smoke:pg:compose
```

Default port: `3001`

Database behavior:

- Host development (`npm run dev` from the root or from `packages/backend`) uses the backend's default in-memory SQLite path.
- Docker Compose sets `DB=pg`, so the backend talks to PostgreSQL instead.
- In the SQLite-backed host workflow, data is recreated whenever the backend process restarts.

This distinction is important when you are debugging data access behavior or reproducing issues, because the active database engine and data lifetime depend on the workflow you choose.

For a focused automated check of the Docker-only Postgres path, run `npm run test:smoke:pg:compose` from `packages/backend`. That command brings up the Compose `db` service if needed, waits for PostgreSQL health, runs the Vitest smoke test, and stops the database container afterward only if it started it.

### Frontend

Location: `packages/frontend`

The frontend is the browser application. During development it runs through Vite and proxies backend requests to the API service.

Use this package when you are changing UI, routing, state management, or browser-side integration with backend endpoints.

Useful commands:

```bash
cd packages/frontend
npm run dev
npm run build
npm run preview
npx playwright install chromium
npm run test:smoke
```

Default port: `3000`

## Root Commands

Install all workspace dependencies:

```bash
npm install
```

Run both applications in parallel:

```bash
npm run dev
```

Build workspace packages:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

Run the frontend browser smoke suite:

```bash
npx playwright install chromium
npm run test:smoke:frontend
```

The Playwright browser install only needs to be done the first time on a machine, or when the Playwright version changes.

Lint the monorepo:

```bash
npm run lint
```

Fix lint issues where possible:

```bash
npm run lint:fix
```

## Docker Workflow

The repository currently uses a single Docker Compose file at the root:

```bash
npm run docker:build
npm run docker:up
npm run docker:logs
npm run docker:down
```

What this setup does:

- Runs backend and frontend as separate containers
- Runs a PostgreSQL container for the backend
- Mounts `packages/backend` and `packages/frontend` from the host into the containers
- Exposes the frontend on `localhost:3000`
- Exposes the backend on `localhost:3001`
- Exposes PostgreSQL on `localhost:5432`
- Starts the frontend with Vite using `--host`, which makes it reachable from outside the container

Compose-specific database notes:

- The backend container sets `DB=pg`, which selects `packages/backend/database/pg` instead of the default SQLite implementation.
- PostgreSQL is initialized from the SQL files in `packages/backend/database/pg/seed`.
- The Compose file uses the default local credentials `postgres` / `postgres` and database name `stock_simulator_dev`.

Because the source directories are bind-mounted, you can edit files on the host machine while the applications continue running in Docker.

This change is significant for development workflow documentation because `npm run dev` and `npm run docker:up` no longer exercise the same database backend. Use host development for the lightest setup, and use Compose when you specifically need Postgres-backed behavior or a fuller multi-container environment.

If you already have the stack running and only changed application source files, rebuilding is usually not necessary. If you changed dependencies or Dockerfiles, rebuild the images before starting the stack again.

To verify the Postgres-backed backend path without manually managing the database container, you can also run:

```bash
cd packages/backend
npm run test:smoke:pg:compose
```

This smoke test covers the seeded admin login flow and seeded stock data against PostgreSQL.

## Frontend Smoke Suite

The frontend package also includes a thin Playwright smoke suite under `packages/frontend/smoke`. It starts the backend and frontend on the host, then verifies the core admin browser path:

- redirect from a protected admin route to `/login`
- seeded admin login through the real form
- market dashboard load
- security dashboard load

Run it from the root:

```bash
npx playwright install chromium
npm run test:smoke:frontend
```

Or from the frontend package:

```bash
cd packages/frontend
npx playwright install chromium
npm run test:smoke
```

## Development Notes

- The frontend Vite server proxies `/health`, `/admin`, `/csrf-token`, and `/stock-market` to the backend.
- The backend development server runs with `nodemon`, so server changes restart automatically.
- The backend database layer defaults to in-memory SQLite unless `DB` is set; Docker Compose sets `DB=pg` for the backend container.
- Docker enables polling for frontend file watching to keep updates reliable in containerized development.

## Typical Workflows

### Work on both apps together

```bash
npm run dev
```

This is the quickest workflow and keeps the backend on in-memory SQLite.

### Work inside Docker while editing on the host

```bash
npm run docker:up
```

Use this workflow when you want the backend running against the Compose-managed PostgreSQL container.

### Work on just one package

```bash
cd packages/backend && npm run dev
cd packages/frontend && npm run dev
```

## Troubleshooting

### Ports already in use

The default ports are `3000` for the frontend and `3001` for the backend. Stop any existing process using those ports before starting the apps again.

### Docker rebuilds

If dependencies or Dockerfiles change, rebuild before bringing the stack back up:

```bash
npm run docker:build
npm run docker:up
```

### Fresh install

If workspace dependencies get out of sync:

```bash
rm -rf node_modules packages/*/node_modules
npm install
```
