# Build stage
FROM node:24-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG PORT=3000
ARG BACKEND_BASE_URL=
ENV PORT=$PORT
ENV BACKEND_BASE_URL=
EXPOSE $PORT
CMD ["npm", "run", "dev", "--", "--host"]
