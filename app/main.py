from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.fake_db import fake_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Firmware Shop API работает!"}


@app.get("/firmwares")
async def get_firmwares():
    return fake_db["firmwares"]


@app.get("/users")
async def get_users():
    return fake_db["users"]
