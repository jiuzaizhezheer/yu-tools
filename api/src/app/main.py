from importlib.metadata import PackageNotFoundError
from importlib.metadata import version as package_version

import uvicorn
from fastapi import APIRouter, FastAPI

APP_NAME = "yu-tools-api"
APP_PACKAGE_NAME = "app"
APP_VERSION_FALLBACK = "0.1.0"

router = APIRouter(prefix="/api", tags=["system"])


def get_app_version() -> str:
    try:
        return package_version(APP_PACKAGE_NAME)
    except PackageNotFoundError:
        return APP_VERSION_FALLBACK


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/version")
def version() -> dict[str, str]:
    return {"name": APP_NAME, "version": get_app_version()}


app = FastAPI(title=APP_NAME)
app.include_router(router)


def main() -> None:
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=False)
