# app
This is the frontend to the backend in app-service. It allows you to run the model from a simple web page. It only supports a single URL for now.

## Local development

```
docker build -t app-frontend .
# -d runs it in detached mode, -p sets the port to localhost:3000 and --rm makes sure it's deleted after being stopped, frontend is the tag
docker run -d -p 3000:80 --rm frontend
```

## CI

The CI builds the image and pushes it to GHCR in case of:

- pull requests, with the PR branch name as tag, as well as the commit short sha
- releases, with the tag name as tag, as well as 'latest', as well as the commit short sha
- pushes to main, with 'main' as tag, as well as the commit short sha

The image can then be pulled from `ghcr.io/remla24-team8/app-frontend:<tag>`.

## Architecture

This is a React application that is built as a static SPA using Vite. It is served using Caddy, which injects the deployment version header and the backend URL into the application to use.
