FROM node:20-alpine as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
# CI builds only the dependencies in the lockfile, this ensures build is reproducible
RUN npm ci
COPY . .
# Use the index.html with Caddy templates
RUN mv caddy/index.html .
ARG DEPLOY_NAME=""
RUN npm run build -- --base /frontend/${DEPLOY_NAME}

# We use a multi-stage build to make the final version
FROM caddy:2.8-alpine

# Copy a custom Caddyfile
COPY caddy/Caddyfile /etc/caddy/Caddyfile
# Copy the build output to Caddy's web root
COPY --from=build /app/dist /usr/share/caddy

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]