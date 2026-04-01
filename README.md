# yu-tools

`yu-tools` is a single Git repository with two independent projects:

- `ui`: React + Vite + TypeScript + pnpm
- `api`: FastAPI + uv

## Prerequisites

- Node.js
- `pnpm`
- Python 3.13
- `uv`
- GNU Make

Notes:

- The `Makefile` commands themselves avoid PowerShell-specific syntax, so they are suitable for GNU Make on macOS, Linux, and Windows.
- On Windows, `make` is not installed by default. Use Git Bash, MSYS2, WSL, or install GNU Make yourself.

## Project Structure

```text
yu-tools/
├─ ui/
├─ api/
├─ .pre-commit-config.yaml
├─ Makefile
└─ README.md
```

## Initialize The Workspace

Run everything from the repository root:

```bash
make setup
```

This will:

1. install frontend dependencies
2. sync backend dependencies
3. install the root `pre-commit` hook

## Manual Initialization

If `make` is unavailable, run the equivalent commands manually from the repository root:

```bash
pnpm --dir ui install
uv sync --project api --group dev
uv tool run --from pre-commit pre-commit install
```

## Common Commands

```bash
make ui-typecheck
make ui-lint
make ui-format-check
make ui-build

make api-mypy
make api-ruff-check
make api-ruff-format-check

make check
```

## Git Hooks And CI

- Local Git hooks are configured at the repository root via `.pre-commit-config.yaml`.
- GitHub Actions CI is configured at `.github/workflows/ci.yml`.
- Both are organized at the root, but frontend and backend checks are still scoped to their own directories.
