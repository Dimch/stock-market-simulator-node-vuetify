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

Choose the workflow based on what you need:

- Use `npm run dev` when you want the simplest local setup.
- Use Docker when you want both apps running in containers while editing source files on the host.

## Structure

```text
.
├── docker-compose.yaml
├── package.json
├── turbo.json
└── packages/
    ├── backend/
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
```

Default port: `3001`

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
- Mounts `packages/backend` and `packages/frontend` from the host into the containers
- Exposes the frontend on `localhost:3000`
- Exposes the backend on `localhost:3001`
- Starts the frontend with Vite using `--host`, which makes it reachable from outside the container

Because the source directories are bind-mounted, you can edit files on the host machine while the applications continue running in Docker.

If you already have the stack running and only changed application source files, rebuilding is usually not necessary. If you changed dependencies or Dockerfiles, rebuild the images before starting the stack again.

## Development Notes

- The frontend Vite server proxies `/health`, `/admin`, `/csrf-token`, and `/stock-market` to the backend.
- The backend development server runs with `nodemon`, so server changes restart automatically.
- Docker enables polling for frontend file watching to keep updates reliable in containerized development.

## Typical Workflows

### Work on both apps together

```bash
npm run dev
```

### Work inside Docker while editing on the host

```bash
npm run docker:up
```

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
