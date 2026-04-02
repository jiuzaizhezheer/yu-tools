# ui

React + Vite + TypeScript frontend for `yu-tools`.

## 启动

在仓库根目录执行：

```bash
pnpm --dir ui install
pnpm --dir ui dev
```

默认访问地址：`http://127.0.0.1:5173`（Vite 默认端口）。

## API 调用链路

- 前端统一请求相对路径 `/api/*`。
- 开发环境由 `vite.config.ts` 代理到 `http://127.0.0.1:8000`。
- 当前已接通：
  - `GET /api/health`
  - `GET /api/version`

## 目录

```text
ui/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ App.css
   └─ index.css
```

## 约定

- 保持 TypeScript 严格模式，不使用 `any` 逃避类型检查。
- 业务请求使用 `/api/*`，不要在组件中硬编码后端主机地址。
- 提交前保持 `typecheck`、`lint`、`format:check`、`build` 全通过。

## 常见命令

在仓库根目录执行：

```bash
make ui-typecheck
make ui-lint
make ui-format-check
make ui-build
```

在 `ui/` 目录执行：

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```
