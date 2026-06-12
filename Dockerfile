FROM node:22-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
    RUN npm install

COPY . .
RUN npm run build

FROM node:22-slim AS run

WORKDIR /app
# TanStack Start packages everything for production into the .output directory
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

EXPOSE 3000

# The standard entry point for running the full-stack TanStack production server
CMD ["node", ".output/server/index.mjs"]
