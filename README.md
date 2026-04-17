# Stock Market Simulator

Stock Market Simulator is a full-stack monorepo for a stock-trading style application with a customer-facing market experience and an administrative interface for operating the system.

For repository layout, package-level commands, and workflow details, see [MONOREPO.md](MONOREPO.md).

## Overview

The project is split into two applications:

- `packages/backend` runs the HTTP API, authentication flows, stock simulation logic, and admin/customer services.
- `packages/frontend` runs the browser application that consumes those backend routes and presents the market and admin interfaces.

The repository is managed as a workspace monorepo, so installation, builds, tests, and development commands can be run from the root.

## What the Project Includes

- A customer-facing stock market UI with simulated stock data and historical views
- An admin area for operational controls and configuration
- Authentication flows for different user roles
- Server-side protections such as sessions, CSRF handling, and rate limiting
- A Docker-based development workflow that allows editing code on the host while services run in containers

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally from the host

```bash
npm run dev
```

This starts the frontend and backend workspaces in parallel from the monorepo root.

### Run with Docker

```bash
npm run docker:build
npm run docker:up
```

The current Docker setup mounts the backend and frontend source trees into their containers so you can keep editing on the host machine while the apps run inside Docker.

Default access points:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## Common Root Commands

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run docker:up
npm run docker:down
```

## Project Status

The repository already contains the core application structure, package separation, and containerized development workflow. For day-to-day usage, package-level details, and Docker notes, use [MONOREPO.md](MONOREPO.md) as the primary reference.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
