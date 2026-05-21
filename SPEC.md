# 个人艺术家官网 - 项目规格说明书

## 1. 项目概述

- **项目名称**: artist-portfolio
- **项目类型**: 艺术家个人官网（展示型网站）
- **核心功能**: 作品展示、展览履历、媒体文献、联系表单
- **目标用户**: 收藏家、策展人、画廊、媒体
- **技术栈**: Next.js (App Router) + TypeScript + Tailwind CSS
- **部署目标**: Vercel

---

## 2. 视觉风格

### 2.1 色彩
| 用途 | 色值 |
|------|------|
| 背景 | #FFFFFF |
| 主文字 | #111111 |
| 次级文字 | #666666 |
| 分割线 | #E5E5E5 |
| 悬停状态 | #999999 |

### 2.2 字体
- 英文: Helvetica Neue / Arial / Inter（简洁现代）
- 中文: 思源黑体 / Noto Sans SC / 苹方
- 艺术家姓名: 大字号 serif 或极简无衬线

### 2.3 整体风格
- 极简、留白、博物馆/画廊质感
- 白色背景 + 大量留白
- 禁止过多渐变、霓虹色、大面积彩色按钮
- 参考: https://www.jeffkoons.com/ 的艺术档案型风格

---

## 3. 页面结构

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | / | Hero + 代表作品 + About + News |
| 作品 | /works | 作品网格 + 筛选 |
| 作品详情 | /works/[slug] | 大图 + 灯箱 + 作品信息 |
| 展览 | /exhibitions | 个展/群展/艺博会时间归档 |
| 履历 | /biography | 简介 + Artist Statement + CV |
| 文献媒体 | /press | 文章/采访/出版物列表 |
| 联系 | /contact | 联系方式 + 表单 |

---

## 4. Phase 1 开发任务（本期 Demo）

### 任务1: 项目初始化和全局布局
- 安装依赖: framer-motion, clsx, tailwind-merge
- 配置 Tailwind: 颜色变量、字体
- 全局样式重置
- Navigation 组件: 左艺术家姓名，右导航链接
- Footer 组件: 栏目链接 + 社交图标

### 任务2: 首页开发
- Hero 区域: 艺术家姓名大标题 + 3-6 张代表作品视觉网格
- Selected Works 区域: 6 件代表作品卡片网格
- About the Artist: 150-300 字简介
- News 模块: 最新动态（展览/新作品/媒体报道）
- 移动端菜单（全屏展开）

### 任务3: 作品页 + 详情页 + 灯箱
- 作品网格: 3列，筛选器（All/Painting/Sculpture/Installation/Digital）
- WorkCard 组件: 图片 + 名称 + 年份，悬停显示更多信息
- 作品详情页: 大图 + 右侧信息
- Lightbox 组件: 点击放大、左右切换、ESC关闭
- 图片懒加载

### 任务4: 展览页（简化版）
- Solo / Group 分类
- 年份倒序归档
- 展览条目: 名称、地点、时间

### 任务5: 联系页（简化表单）
- 联系方式展示
- 表单字段: Name, Email, Subject, Message, Inquiry Type
- 提交后显示成功提示（不发真实邮件）

### 任务6: 履历页（简化版）
- 中文简介 + 英文简介
- Artist Statement
- CV 列表（教育、展览、奖项）

---

## 5. 数据与 CMS 策略

- **Phase 1 (Demo)**: 使用 JSON 文件模拟内容数据
  - /src/data/works.json（12件作品）
  - /src/data/exhibitions.json
  - /src/data/artist.json
- **Phase 2**: 接入 Sanity CMS
- **最终版**: 迁移到 Payload CMS + PostgreSQL
- **图片托管**: Cloudinary
- **部署**: Vercel

---

## 6. 响应式断点

| 设备 | 宽度 |
|------|------|
| 手机 | 375px / 390px / 430px |
| 平板 | 768px |
| 笔记本 | 1280px |
| 桌面 | 1440px / 1920px |

---

## 7. 图片占位

使用 https://picsum.photos/ 或本地占位图，比例统一为 4:3 或 1:1。

---

## 8. 开发规范

- 组件放在 /src/components/
- 页面放在 /src/app/
- 数据放在 /src/data/
- 使用 Tailwind CSS 原子化类名
- 动画使用 framer-motion
- 字体使用 next/font 优化加载
