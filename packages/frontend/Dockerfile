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

ARG PORT=3000
ENV PORT=$PORT

EXPOSE $PORT

CMD ["serve", "-s", "dist", "-l", "$PORT"]
