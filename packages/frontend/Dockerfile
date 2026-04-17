# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Install a simple HTTP server for serving static files
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

ARG FRONTEND_PORT=3000
ENV PORT=$FRONTEND_PORT

EXPOSE $FRONTEND_PORT

CMD ["serve", "-s", "dist", "-l", "3000"]
