# api

FastAPI backend for `yu-tools`.

## 启动

在仓库根目录执行：

```bash
uv sync --project api --group dev
uv run --project api api
```

服务默认监听 `http://127.0.0.1:8000`。

## 当前接口

- `GET /api/health`: 健康检查，返回 `{"status":"ok"}`
- `GET /api/version`: 版本信息，返回应用名和版本号

## 目录

```text
api/
├─ pyproject.toml
├─ uv.lock
└─ src/
   └─ app/
      ├─ __init__.py
      └─ main.py
```

## 约定

- 所有新增业务接口统一放在 `/api/*` 路径下。
- 路由函数必须保留完整类型标注，保证 `mypy --strict` 可通过。
- 提交前保持 `ruff check` 和 `ruff format --check` 通过。

## 常见命令

在仓库根目录执行：

```bash
make api-mypy
make api-ruff-check
make api-ruff-format-check
```

在 `api/` 目录执行：

```bash
uv run mypy src
uv run ruff check .
uv run ruff format --check .
```
