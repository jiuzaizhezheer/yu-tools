import uvicorn
from fastapi import FastAPI

app = FastAPI(title="yu-tools-api")


def main() -> None:
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=False)
