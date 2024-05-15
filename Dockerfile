# Stage 1: Build the frontend (static files)
FROM nginx:alpine as frontend-build
COPY app-frontend/public /usr/share/nginx/html
COPY app-frontend/stylesheet /usr/share/nginx/html

# Stage 2: Set up the backend service
FROM python:3.12-slim as backend-build
WORKDIR /app-service

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application source code
COPY app-service .

# Install gdown
RUN pip install gdown

# Download the model using gdown
ARG MODEL_URL
RUN gdown ${MODEL_URL} -O models/model.joblib

# Final Stage: Run the backend service and serve static files
FROM python:3.12-slim
WORKDIR /app-service
COPY --from=backend-build /app-service /app-service
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy static files from frontend build
COPY --from=frontend-build /usr/share/nginx/html /usr/share/nginx/html

EXPOSE 5000

CMD ["python", "app.py"]
