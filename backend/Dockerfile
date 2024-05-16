FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV MODEL_SERVICE_URL=http://model-service:5000

CMD ["python", "app.py"]
