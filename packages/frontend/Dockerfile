# Build stage
FROM node:24-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG PORT=3000
ARG BACKEND_PORT=
ENV PORT=$PORT
ENV BACKEND_PORT=
EXPOSE $PORT
CMD ["npm", "run", "dev", "--", "--host"]
