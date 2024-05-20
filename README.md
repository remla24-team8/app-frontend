# app
The application has a frontend and a service, which can, but do not have to, be implemented separately. The application uses the model service in a sensible use case.

• Depends on the lib-version through a package manager (e.g., Maven). The version is visible in the frontend.

• Queries the model-service through REST requests.

• The URL of the model-service is configurable as an environment variable.


## Usage

```

docker build -t frontend .

docker run -dp 3000:3000 --rm frontend
```


