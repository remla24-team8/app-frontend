# app
This is the frontend to the backend in app-service. It allows you to run the model from a simple web page. It only supports a single URL for now.

## Local development

```
docker build -t frontend .
# -d runs it in detached mode, -p sets the port to localhost:3000 and --rm makes sure it's deleted after being stopped, frontend is the tag
docker run -d -p 3000:80 --rm frontend
```

## Run production version

The CI builds the image with name `ghcr.io/remla24-team8/app-frontend`.

You can pull the latest development version with `docker pull ghcr.io/remla24-team8/app-frontend:main`. When you make a release, it also creates a tagged version, so e.g. `ghcr.io/remla24-team8/app-frontend:v0.1.0`. 