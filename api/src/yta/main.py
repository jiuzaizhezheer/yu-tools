from importlib.metadata import PackageNotFoundError
from importlib.metadata import version as package_version

import uvicorn
from fastapi import APIRouter, FastAPI

APP_NAME = "yu-tools-api"
APP_PACKAGE_NAME = "yta"
APP_VERSION_FALLBACK = "0.1.0"


sys_router = APIRouter(prefix="/api", tags=["system"])


def _get_app_version() -> str:
    try:
        return package_version(APP_PACKAGE_NAME)
    except PackageNotFoundError:
        return APP_VERSION_FALLBACK


@sys_router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@sys_router.get("/version")
def version() -> dict[str, str]:
    return {"name": APP_NAME, "version": _get_app_version()}


app = FastAPI(title=APP_NAME)
app.include_router(sys_router)


def main() -> None:
    uvicorn.run("yta.main:app", host="127.0.0.1", port=8000, reload=False)


if __name__ == "__main__":
    main()
