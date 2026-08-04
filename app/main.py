from fastapi import FastAPI

app = FastAPI()

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
