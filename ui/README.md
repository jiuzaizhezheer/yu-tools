# ui

`yu-tools` 的前端项目，基于 React 19 + Vite 8 + TypeScript 5.9 + Tailwind CSS 4 (ES2023)。

## 前端目录结构

```text
ui/
├─ public/              # 公共静态资源
└─ src/                 # 前端源码
   ├─ app/              # 应用装配层
   ├─ assets/           # 构建处理的资源目录
   ├─ entities/         # 实体层（预留）
   ├─ features/         # 功能层
   │  └─ system-status/ # 系统状态功能
   ├─ pages/            # 页面层
   │  └─ home/          # 首页
   └─ shared/           # 共享层
      ├─ lib/           # 通用库
      │  ├─ envs/       # 环境变量读取与导出
      │  └─ http/       # HTTP 请求封装
      ├─ styles/        # 样式资源
      └─ types/         # 共享类型
```
