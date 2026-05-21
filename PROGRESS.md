# Artist Portfolio 网站开发进度与计划

> 最后更新：2025-05-19

---

## 📊 Phase 1 — 静态原型（JSON 数据）
**状态：✅ 已完成**

### 已完成功能
- [x] 项目初始化（Next.js 16 + TypeScript + Tailwind CSS + App Router）
- [x] 中英双语界面
- [x] 首页（Featured Works 瀑布流 + News + About）
- [x] 作品列表页（Works）— 支持 Painting/Sculpture/Installation 筛选
- [x] 作品详情页（WorkDetail）— 图片 Lightbox 灯箱 + 键盘/滑动手势导航
- [x] 简历页（Biography）
- [x] 展览页（Exhibitions）
- [x] 新闻/媒体页（Press）
- [x] 联系页（Contact）
- [x] 响应式导航栏 + Footer
- [x] 动画效果（Framer Motion 淡入/滚动触发）
- [x] 图片本地化（解决 iPhone 无法访问 picsum.photos 问题）
- [x] 图片全部正常加载（10/10 naturalWidth=800 ✅）
- [x] Tailscale 跨设备访问（CORS 配置）
- [x] `npm run build` 通过（12 个作品详情页 + 5 个其他页面）

### 待优化（Phase 1 收尾）
- [ ] Hydration Warning（仅 iPhone Safari，暂不影响功能）
- [ ] Press 页面内容充实
- [ ] Contact 表单后端对接（目前仅前端展示）
- [ ] SEO / sitemap / robots.txt
- [ ] Vercel 部署（方便真机验证）

### 技术细节
| 项目 | 技术 |
|------|------|
| 框架 | Next.js 16.2.6 (Turbopack) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 动画 | Framer Motion |
| 图片 | Next.js Image（`unoptimized: true`） |
| 数据 | JSON 文件（`src/data/`） |
| 部署 | Vercel（待部署） |

---

## 📋 Phase 2 — Sanity CMS 集成
**状态：🔴 未开始**

### 目标
用 Sanity CMS 替换 JSON 文件，实现内容管理层，让艺术家无需写代码即可更新作品、新闻、展览信息。

### 计划任务
- [ ] 创建 Sanity Studio 项目（`sanity init`）
- [ ] 定义 Content Model：Work、Exhibition、NewsItem、ArtistBio
- [ ] 配置 GROQ 查询替换 JSON import
- [ ] 实现 ISR（Incremental Static Regeneration）实现热更新
- [ ] 配置中文/英文双语 Schema
- [ ] 迁移现有 JSON 数据到 Sanity
- [ ] 部署 Sanity Studio
- [ ] 更新 Vercel 环境变量
- [ ] 验证内容更新后网站自动刷新

### 预估工时
约 3-4 天

---

## 📋 Phase 3 — Payload CMS + PostgreSQL
**状态：🔴 未开始**

### 目标
Self-hosted CMS，提供更灵活的权限管理、数据全部自主掌控，替代 Sanity。

### 计划任务
- [ ] 搭建 Payload CMS 项目
- [ ] 配置 PostgreSQL 数据库
- [ ] 定义 Collection Types：Work、Exhibition、NewsItem、ArtistBio、PressContact
- [ ] 迁移 Sanity 数据到 Payload
- [ ] 实现用户认证（管理员后台）
- [ ] 配置 S3/Cloudinary 图床
- [ ] 部署到云服务器（或继续 Vercel + Supabase/Neon PostgreSQL）
- [ ] 配置 CI/CD 自动部署
- [ ] 废弃 Sanity，切换数据源

### 预估工时
约 5-7 天

---

## 🔧 日常维护 & 后续优化
- [ ] 艺术家头像/个人照片上传
- [ ] 邮件通知（Contact 表单提交后发邮件）
- [ ] Google Analytics / Vercel Analytics
- [ ] Open Graph / Twitter Card SEO 优化
- [ ] PDF 作品集下载功能
- [ ] 图片水印功能（可选）
- [ ] 多语言扩展（中/英/其他语言）

---

## 📁 项目结构
```
artist-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局（字体 + Navigation + Footer）
│   │   ├── page.tsx            # 首页
│   │   ├── works/
│   │   │   ├── page.tsx        # 作品列表
│   │   │   └── [slug]/page.tsx # 作品详情
│   │   ├── biography/page.tsx
│   │   ├── exhibitions/page.tsx
│   │   ├── press/page.tsx
│   │   └── contact/page.tsx
│   ├── components/            # UI 组件
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── WorksPage.tsx
│   │   ├── WorkDetailPage.tsx  # Lightbox 组件
│   │   ├── ExhibitionsPage.tsx
│   │   ├── BiographyPage.tsx
│   │   └── ContactPage.tsx
│   └── data/                  # JSON 模拟数据
│       ├── works.json          # 12 件作品
│       ├── exhibitions.json    # 13 场展览
│       ├── artist.json         # 艺术家信息 + 新闻
│       └── press.json
├── public/images/             # 本地图片资源（12张）
├── SPEC.md                    # 项目设计规范
├── REQUIREMENTS.md            # 需求文档
├── PROGRESS.md                # 本文件
├── next.config.ts
└── tailwind.config.ts
```

---

## 📅 总预估工时

| Phase | 内容 | 预估 |
|-------|------|------|
| Phase 1 | 静态原型 + 修 bug | 已完成（修图中） |
| Phase 2 | Sanity CMS | 3-4 天 |
| Phase 3 | Payload + PostgreSQL | 5-7 天 |
| **合计** | | **约 8-11 天** |
