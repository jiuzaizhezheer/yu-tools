# yu-tools

`yu-tools` 是一个包含前后端服务的单一 Git 仓库：

- `ui`: React + Vite + TypeScript + Tailwind CSS + pnpm
- `api`: FastAPI + Python + uv

## 环境要求

- Node.js 22+
- `pnpm` 10+
- Python 3.13+
- `uv` 0.9+
- GNU Make

注意：

- `Makefile` 命令本身避免了 PowerShell 特有的语法，因此适用于 macOS、Linux 和 Windows 上的 GNU Make。
- 在 Windows 上，默认不安装 `make`。请使用 Git Bash、MSYS2、WSL，或自行安装 GNU Make。

## 项目结构

```text
yu-tools/
├─ .github/                # GitHub Actions 工作流配置
├─ api/                    # 后端项目 (FastAPI + Python)
├─ ui/                     # 前端项目 (React + Vite + TypeScript + Tailwind CSS)
├─ .gitignore              # Git 忽略文件
├─ .pre-commit-config.yaml # 代码提交前的自动化检查配置
├─ Makefile                # 快捷命令配置
└─ README.md               # 项目自述文档
```

## 初始化工作区

以下命令默认均在仓库根目录下运行：

```bash
make setup
```

该命令将执行：

1. 安装前端依赖
2. 同步后端依赖
3. 安装根目录的 `pre-commit` 钩子

## 手动初始化

如果无法使用 `make`，请在仓库根目录手动运行以下等效命令：

```bash
pnpm --dir ui install
uv sync --project api --group dev
uv tool run --from pre-commit pre-commit install
```

## 启动命令

```bash
make ui-dev
make api-dev
```

## 前端检查命令

```bash
make ui-typecheck
make ui-lint
make ui-format
make ui-format-check
make ui-build
```

## 后端检查命令

```bash
make api-mypy
make api-ruff-check
make api-ruff-format
make api-ruff-format-check
```

## 修复命令

当 `format-check` 或 lint 检查失败时，可先执行以下自动修复命令：

```bash
make ui-format
make api-ruff-format
```

修复后建议再次执行检查：

```bash
make ui-format-check
make api-ruff-format-check
```

## 快捷运行所有检查命令

```bash
make verify
```

## 命令对照表

### 开发与启动
| `make` 命令 | 对应的原始终端命令 |
| :--- | :--- |
| `make ui-dev` | `pnpm --dir ui dev` |
| `make api-dev` | `uv run --project api api` |

### 前端检查 (UI)
| `make` 命令 | 对应的原始终端命令 |
| :--- | :--- |
| `make ui-typecheck` | `pnpm --dir ui typecheck` |
| `make ui-lint` | `pnpm --dir ui lint` |
| `make ui-format` | `pnpm --dir ui format` |
| `make ui-format-check`| `pnpm --dir ui format:check` |
| `make ui-build` | `pnpm --dir ui build` |

### 后端检查 (API)
| `make` 命令 | 对应的原始终端命令 |
| :--- | :--- |
| `make api-mypy` | `uv run --project api mypy --config-file api/pyproject.toml --cache-dir api/.mypy_cache api/src` |
| `make api-ruff-check` | `uv run --project api ruff check api --config api/pyproject.toml --cache-dir api/.ruff_cache` |
| `make api-ruff-format` | `uv run --project api ruff format api --config api/pyproject.toml --cache-dir api/.ruff_cache` |
| `make api-ruff-format-check` | `uv run --project api ruff format --check api --config api/pyproject.toml --cache-dir api/.ruff_cache` |

### 聚合任务
| `make` 命令 | 说明 |
| :--- | :--- |
| `make verify` | 运行上述所有 UI 与 API 的格式修复与检查命令 |

## Git 钩子与 CI

- 本地 Git 钩子通过仓库根目录下的 `.pre-commit-config.yaml` 进行配置。
- GitHub Actions CI 在 `.github/workflows/ci.yml` 中进行配置。
