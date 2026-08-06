from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.fake_db import fake_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# API ЭНДПОИНТЫ
# ============================================================


@app.get("/api/firmwares")
async def get_firmwares():
    return fake_db["firmwares"]


@app.get("/api/users")
async def get_users():
    return fake_db["users"]


# ============================================================
# РАЗДАЧА REACT
# ============================================================

# Путь до собранного фронта
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "../frontend/dist")


if os.path.exists(FRONTEND_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")

    # Все остальные запросы (кроме /api) отдаём index.html
    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        if full_path.startswith("api/"):
            return None
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

else:
    print("⚠️ Папка frontend/dist не найдена. Запусти 'npm run build' в папке frontend")

# ============================================================
# ЗАПУСК
# ============================================================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
