# api

`yu-tools` 的后端服务，基于 FastAPI + Python 3.13，采用 `src` 布局组织代码。

## 后端目录结构

```text
api/
├─ src/             # 源代码目录
│  ├─ tests/        # 后端测试包
│  │  └─ __init__.py
│  └─ yta/          # 后端应用主包 (路由与应用入口)
│     ├─ __init__.py
│     └─ main.py
├─ .python-version  # 使用的 Python 版本
├─ pyproject.toml   # 后端项目元数据、依赖与工具配置
└─ uv.lock          # 后端依赖锁定文件
```
