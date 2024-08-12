FROM node:20-alpine AS builder
WORKDIR /staging
COPY . /staging/
RUN corepack enable && \
  yarn install --frozen-lockfile && \
  yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /staging/package.json /staging/yarn.lock  /app/
COPY --from=builder /staging/node_modules /app/node_modules
COPY --from=builder /staging/build /app/build

EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "/app/build/index.js"]