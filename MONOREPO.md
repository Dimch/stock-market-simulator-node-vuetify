# Stock Market Simulator - Monorepo Setup

This project is now organized as a Turborepo monorepo with two separate packages: backend and frontend.

## 📁 Project Structure

```
stock-market-simulator-monorepo/
├── packages/
│   ├── backend/              # Node.js/Express backend service
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   ├── admin_services/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── lib/
│   │   ├── stock_market/
│   │   ├── user_services/
│   │   └── test/
│   │
│   └── frontend/             # Vue.js frontend application
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── Dockerfile
│       ├── vite.config.mjs
│       └── index.html
│
├── docker-compose.yml        # Orchestration for both services
├── turbo.json               # Turborepo configuration
├── package.json             # Root package configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (for containerized deployment)

### Installation

Install dependencies for all packages:

```bash
npm install
```

This will automatically install dependencies for both backend and frontend packages due to the workspace configuration.

## 📝 NPM Scripts

### Development

Start both services in development mode (runs in parallel):

```bash
npm run dev
```

Or run individual services:

```bash
cd packages/backend && npm run dev
cd packages/frontend && npm run dev
```

### Building

Build all packages:

```bash
npm run build
```

Build individual packages:

```bash
cd packages/backend && npm run build
cd packages/frontend && npm run build
```

### Linting

Lint all packages:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

### Testing

Run tests across all packages:

```bash
npm run test
```

## 🐳 Docker Deployment

### Build and Run with Docker Compose

Build all services:

```bash
npm run docker:build
```

Start services:

```bash
npm run docker:up
```

View logs:

```bash
npm run docker:logs
```

Stop services:

```bash
npm run docker:down
```

### Service Access

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Backend from Frontend**: http://backend:3001 (within Docker network)

## 📦 Package Details

### Backend Package

Located in `packages/backend/`

- **Framework**: Express.js
- **Port**: 3001
- **Key Features**:
  - Authentication (Passport.js)
  - Rate limiting
  - Admin services
  - Stock market simulation logic
  - Database integration

**Start backend in development:**

```bash
cd packages/backend && npm run dev
```

### Frontend Package

Located in `packages/frontend/`

- **Framework**: Vue 3 with Vuetify
- **Build Tool**: Vite
- **Port**: 3000
- **Key Features**:
  - Responsive UI components (Vuetify)
  - State management (Pinia)
  - Routing (Vue Router)
  - i18n support

**Start frontend in development:**

```bash
cd packages/frontend && npm run dev
```

## 🔧 Turborepo Configuration

The `turbo.json` file configures:

- **Pipeline**: Task dependencies and caching
- **Build cache**: Optimizes incremental builds
- **Task outputs**: Specifies which files to cache per task

Tasks are configured to:
- Cache build outputs
- Use dependency graphs for efficient execution
- Support parallel execution where possible

## 📊 Dependencies Management

### Backend Dependencies

Core dependencies:
- `express` - Web framework
- `passport` - Authentication
- `pino` - Logging
- `argon2` - Password hashing
- And more (see `packages/backend/package.json`)

### Frontend Dependencies

Core dependencies:
- `vue` - Progressive JavaScript framework
- `vuetify` - Material Design component framework
- `vite` - Next generation frontend tooling
- `pinia` - State management
- `vue-router` - Client-side routing
- And more (see `packages/frontend/package.json`)

## 🔐 Environment Variables

Create `.env` files in each package as needed:

**Backend** (`packages/backend/.env`):
```
NODE_ENV=development
PORT=3001
```

**Frontend** (`packages/frontend/.env`):
```
VITE_API_BASE_URL=http://localhost:3001
```

For Docker, environment variables are configured in `docker-compose.yml`.

## 🤝 Contributing

When adding new dependencies:

1. Install to the specific package:
   ```bash
   cd packages/backend  # or frontend
   npm install <package-name>
   ```

2. Install dev dependencies:
   ```bash
   npm install --save-dev <package-name>
   ```

## 🐛 Troubleshooting

### Port already in use

Change ports in respective `package.json` files or `docker-compose.yml`

### Dependencies not installing

Clear npm cache and reinstall:

```bash
npm cache clean --force
rm -rf node_modules packages/*/node_modules package-lock.json
npm install
```

### Docker build issues

Rebuild without cache:

```bash
docker-compose build --no-cache
```

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build)
- [Vue 3 Documentation](https://vuejs.org)
- [Vuetify Documentation](https://vuetifyjs.com)
- [Express.js Documentation](https://expressjs.com)
