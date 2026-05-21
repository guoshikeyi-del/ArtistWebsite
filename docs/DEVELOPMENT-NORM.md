# Artist Portfolio — 开发规范

> 最后更新：2025-05-19

---

## 开发流程规范

### Git 推送规则

**开发阶段：不 push，每项任务本地验收完成后通知用户，由用户决定何时 push。**

- 每完成一个 Task，本地 `npm run dev` 验证效果
- 不依赖 git push 触发自动部署来验收
- 等用户说"可以 push"时才推送到 GitHub
- 只有经用户确认验收通过的功能才能 push

---

## 部署方式

- 托管平台：Cloudflare Pages
- 触发方式：GitHub `main` 分支 push 后自动构建部署
- 静态导出：`output: 'export'`（Next.js 配置）

---

## 开发命令

```bash
# 本地开发
npm run dev

# 本地构建验证
npm run build

# 推送 GitHub（需用户明确授权）
git push origin main
```
