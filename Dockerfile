FROM node:20-alpine as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
# CI builds only the dependencies in the lockfile, this ensures build is reproducible
RUN npm ci
COPY . .
RUN npm run build

# We use a multi-stage build to make the final version
FROM caddy:2.8-alpine

# Copy a custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile
# Copy the build output to Caddy's web root
COPY --from=build /app/dist /usr/share/caddy

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]