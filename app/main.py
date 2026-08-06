from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_db = {
    "users": [{"id": 1, "email": "test@example.com"}],
    "firmwares": [{"id": 1, "name": "Audi A4 Stage 2", "price": 100}],
}


@app.get("/")
async def root():
    return {"message": "Firmware Shop API работает!"}


@app.get("/firmwares")
async def get_firmwares():
    return fake_db["firmwares"]


@app.get("/users")
async def get_users():
    return fake_db["users"]
