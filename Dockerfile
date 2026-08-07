# ---- 1. СБОРКА ФРОНТА ----
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Копируем package.json и устанавливаем зависимости
COPY frontend/package*.json ./
RUN npm install

# Копируем ВСЁ (кроме того, что в .dockerignore)
COPY frontend/ ./

# Собираем фронт (теперь dist появится внутри контейнера)
RUN npm run build

# ---- 2. СБОРКА БЭКА ----
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

# Копируем собранный фронт из первой стадии
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]