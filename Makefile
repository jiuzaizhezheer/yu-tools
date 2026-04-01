.PHONY: help setup setup-ui setup-api setup-hooks ui-typecheck ui-lint ui-format-check ui-build api-mypy api-ruff-check api-ruff-format-check check

help:
	@echo "Available targets:"
	@echo "  make setup              Install ui/api dependencies and install git hooks"
	@echo "  make setup-ui           Install frontend dependencies"
	@echo "  make setup-api          Sync backend dependencies"
	@echo "  make setup-hooks        Install root pre-commit hook"
	@echo "  make check              Run all configured checks"
	@echo "  make ui-typecheck       Run frontend TypeScript check"
	@echo "  make ui-lint            Run frontend ESLint"
	@echo "  make ui-format-check    Run frontend Prettier check"
	@echo "  make ui-build           Run frontend production build"
	@echo "  make api-mypy           Run backend Mypy"
	@echo "  make api-ruff-check     Run backend Ruff lint"
	@echo "  make api-ruff-format-check Run backend Ruff format check"

setup: setup-ui setup-api setup-hooks

setup-ui:
	pnpm --dir ui install

setup-api:
	uv sync --project api --group dev

setup-hooks:
	uv tool run --from pre-commit pre-commit install

ui-typecheck:
	pnpm --dir ui typecheck

ui-lint:
	pnpm --dir ui lint

ui-format-check:
	pnpm --dir ui format:check

ui-build:
	pnpm --dir ui build

api-mypy:
	uv run --project api mypy --config-file api/pyproject.toml --cache-dir api/.mypy_cache api/src

api-ruff-check:
	uv run --project api ruff check api --config api/pyproject.toml --cache-dir api/.ruff_cache

api-ruff-format-check:
	uv run --project api ruff format --check api --config api/pyproject.toml --cache-dir api/.ruff_cache

check: ui-typecheck ui-lint ui-format-check api-mypy api-ruff-check api-ruff-format-check
