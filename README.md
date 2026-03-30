# Stock Market Simulator

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5+-4FC08D)](https://vuejs.org/)
[![Vuetify](https://img.shields.io/badge/Vuetify-3.10+-1867C0)](https://vuetifyjs.com/)

A full-stack web application simulating real-time stock market information with an administrative console, price simulation capabilities, and comprehensive REST API integration.

[Quick Start](#quick-start) • [Development](#development) • [Features](#features)

</div>

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Dimch/stock-market-simulator.git
cd stock-market-simulator
```

### Install Dependencies

```bash
npm install
```

## Quick Start

### Development Mode

Start both frontend and backend development servers with one command:

```bash
# Terminal 1: Start backend with nodemon
npm run dev
```

The application will be available at:
- **Frontend Vite**: `http://localhost:3000`
- **Backend Express**: `http://localhost:3001`

### Build for Production

Build the frontend assets:

```bash
npm run build
```

Build outputs will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Development

### Linting

Fix code style issues:

```bash
npm run lint
```

### Testing

Run tests with Vitest:

```bash
npm run test
```

Tests currently include:
- Authentication route tests
- API endpoint validation
- Route protection verification

### Code Structure

- **Backend**: Modular route-based structure with separation of concerns
- **Frontend**: Component-based Vue 3 architecture with state management
- **Database**: Schema-based data models with helper utilities

## Security Features

- **CSRF Protection** - csrf-sync middleware for state-changing operations
- **Helmet.js** - Sets secure HTTP headers
- **Session Security** - Secure, httpOnly cookies with expiration
- **Rate Limiting** - Sliding window limiter for API protection
- **Password Security** - Argon2 password hashing
- **CORS** - Configured for localhost development

## Performance Optimizations

- **Vite** - Dev server and optimized builds
- **Express Static Gzip** - Gzip compression for static assets
- **Pina Colada** - Vue 3 data fetching and caching
- **Pino** - High-performance JSON logging

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

### Docker (Optional)

Build a Docker image:

```bash
docker build -t stock-market-simulator .
docker run -p 3000:3000 -p 3001:3001 stock-market-simulator
```

### Hosting

Deploy to services like:
- **AWS** - Scalable infrastructure
- **Railway** - Full-stack hosting
- **Vercel** - Frontend (Next.js optimization)
- **Heroku** - Backend (Node.js hosting)

## Troubleshooting

### Port Already in Use

```bash
# Kill backend Express server on port 3001
lsof -ti:3001 | xargs kill -9

# Kill Vite UI server process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Issues

Ensure backend CORS settings match your frontend URL in `backend/routes.js`.

### Session/Authentication Issues

Clear browser cookies and restart the development servers.

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Store](https://pinia.vuejs.org/)

## Features

- 📊 **Real-time Stock Market Portal** - Display and track stock information with live updates
- 🎛️ **Administrative Console** - Manage stocks, users, and system configurations
- 📈 **Stock Price Simulation** - Generate and simulate realistic stock price movements
- 🔐 **User Authentication** - Secure login with customer and admin role-based access
- 🛡️ **Security Features** - CSRF protection, session management, rate limiting
- 💾 **Persistent Storage** - Database integration with comprehensive data models
- 🎨 **Modern UI** - Material Design with Vuetify components and responsive layouts
- 📱 **Full REST API** - Complete API endpoints for stock market operations
- 📊 **Data Visualization** - ECharts
- 🌐 **Multi-language Support** - Vue i18n internationalization
- ⚡ **Hot Module Replacement** - Vite development server with instant code refresh
- 🧪 **Comprehensive Testing** - Vitest and Supertest for unit and integration tests

## Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component library
- **Vite** - Next generation frontend tooling
- **Pinia** - Vue 3 state management
- **Vue Router** - Official router for Vue.js
- **Axios** - HTTP client
- **ECharts** - Data visualization libraries

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Fast, unopinionated web framework
- **Passport.js** - Authentication middleware
- **Helmet** - Secure Express apps by setting HTTP headers
- **express-session** - Session management
- **Pino** - Fast JSON logger

### Database
- Structured data models for stocks, customers, admins, and transactions

### Development Tools
- **ESLint** - JavaScript linter
- **Vitest** - Unit testing framework
- **Supertest** - HTTP assertion library
- **Nodemon** - Auto-restart development server
- **Sass** - CSS preprocessor

## Prerequisites

- **Node.js** - v18 or higher
- **npm** or **yarn** - Package manager
- **Modern Browser** - Chrome, Firefox, Safari, or Edge

---

<div align="center">

Made with ❤️ by Dimch

[⬆ Back to top](#stock-market-simulator)

</div>
