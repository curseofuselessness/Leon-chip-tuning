# ---- БЭК (Python) ----
FROM python:3.11-slim

WORKDIR /app

# Устанавливаем системные зависимости (если нужны для БД)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Копируем зависимости Python и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код бэкенда
COPY app/ ./app/

# Копируем уже собранный фронт (из локальной папки frontend/dist)
COPY frontend/dist ./frontend/dist

# Указываем порт
EXPOSE 8000

# Запускаем сервер
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]