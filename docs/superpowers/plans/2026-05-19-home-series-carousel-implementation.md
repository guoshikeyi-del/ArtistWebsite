# Home Series Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在首页 Hero 和 Visual Grid 之间新增 Series Carousel 横向滚动组件，展示 Painting / Sculpture / Installation 三个系列作品。

**Architecture:** 新建 `SeriesCarousel.tsx` 组件，读取 `works.json` 按 `category` 分组，桌面端支持鼠标滚轮横向滚动，移动端手势横滑，语言切换跟随全局 LanguageContext。

**Tech Stack:** React + TypeScript + Framer Motion + Tailwind CSS + Next.js Image

---

## File Map

| 文件 | 操作 |
|------|------|
| `src/components/SeriesCarousel.tsx` | 新建 |
| `src/components/HomePage.tsx` | 修改：在 Hero 和 Visual Grid 之间插入 `<SeriesCarousel />` |

---

## Tasks

### Task 1: 创建 SeriesCarousel.tsx 组件

**Files:**
- Create: `src/components/SeriesCarousel.tsx`

- [ ] **Step 1: 创建组件骨架**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import works from "@/data/works.json";
import { useLanguage } from "@/context/LanguageContext";

const SERIES_CONFIG = {
  Painting: { nameEn: "Painting", nameZh: "绘画" },
  Sculpture: { nameEn: "Sculpture", nameZh: "雕塑" },
  Installation: { nameEn: "Installation", nameZh: "装置" },
};

export default function SeriesCarousel() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  // Group works by category
  const categories = Object.keys(SERIES_CONFIG) as Array<keyof typeof SERIES_CONFIG>;

  return (
    <section className="border-t border-divider py-16 lg:py-24">
      {categories.map((cat) => {
        const catWorks = works.filter((w) => w.category === cat);
        const seriesName = isZh ? SERIES_CONFIG[cat].nameZh : SERIES_CONFIG[cat].nameEn;

        return (
          <div key={cat} className="mb-8 last:mb-0">
            {/* Series title row */}
            <div className="mx-auto max-w-7xl px-6 lg:px-16 flex items-center gap-4 mb-4">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {seriesName}
              </span>
              <span className="text-xs text-secondary/60">{catWorks.length} works</span>
            </div>

            {/* Horizontal scroll track */}
            <div className="series-track overflow-x-auto scroll-smooth scrollbar-hide">
              <div className="flex gap-3 pl-6 lg:pl-16 pr-6 lg:pr-16">
                {catWorks.map((work) => (
                  <Link href={`/works/${work.slug}`} key={work.slug} className="group shrink-0">
                    <div className="relative w-40 h-40 overflow-hidden bg-divider">
                      <Image
                        src={work.image}
                        alt={isZh ? work.titleZh : work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="160px"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.06] transition-colors duration-300" />
                    </div>
                    <p className="mt-2 text-xs text-secondary/80 truncate max-w-[160px]">
                      {isZh ? work.titleZh : work.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: 提交组件骨架**

```bash
cd /Users/jackie/ws/artist-portfolio
git add src/components/SeriesCarousel.tsx
git commit -m "feat(home): create SeriesCarousel component skeleton"
```

---

### Task 2: 将 SeriesCarousel 集成到 HomePage

**Files:**
- Modify: `src/components/HomePage.tsx` — 在 Hero section (line ~69) 和 Visual Grid section (line ~72) 之间插入 `<SeriesCarousel />`

- [ ] **Step 1: 在 HomePage.tsx 顶部添加 import**

在现有 import 区域（line 8 之后）添加：

```tsx
import SeriesCarousel from "./SeriesCarousel";
```

- [ ] **Step 2: 在 Hero 和 Visual Grid 之间插入组件**

在 Hero `</section>` (line 69) 之后，Visual Grid `<section>` (line 72) 之前，添加：

```tsx
      {/* ───── Series Carousel ───── */}
      <SeriesCarousel />
```

- [ ] **Step 3: 本地验证 build**

```bash
cd /Users/jackie/ws/artist-portfolio && npm run build
```

Expected: 0 errors

- [ ] **Step 4: 提交**

```bash
git add src/components/HomePage.tsx
git commit -m "feat(home): integrate SeriesCarousel between Hero and Visual Grid"
```

---

### Task 3: 验收 — 本地测试

- [ ] **Step 1: 启动开发服务器**

```bash
cd /Users/jackie/ws/artist-portfolio && npm run dev
```

打开浏览器访问 http://localhost:3000

- [ ] **Step 2: 验证视觉**

- [ ] **Step 3: 语言切换测试**

点击右上角 EN/中文 切换，验证系列名称同步切换

- [ ] **Step 4: Kill dev server**

```bash
# Ctrl+C 停止
```

---

### Task 4: Push 并触发 Cloudflare Pages 部署

- [ ] **Step 1: Push to GitHub**

```bash
cd /Users/jackie/ws/artist-portfolio && git push origin main
```

- [ ] **Step 2: 等待 Cloudflare Pages 部署成功**

```bash
# 约 1-2 分钟后检查部署状态
curl -s "https://api.cloudflare.com/client/v4/pages/projects/proj-artist-website/deployments" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" | python3 -c "
import sys,json
data=json.load(sys.stdin)
latest=data['result'][0]
print(f\"Status: {latest['status']['state']}, ID: {latest['id']}\")
"
```

Expected: `"success"` 状态

- [ ] **Step 5: 最终验证**

访问 https://proj-artist-website.pages.dev 确认 Series Carousel 正常显示。

---

## Spec Coverage Checklist

- [x] Series Carousel 位置正确（Hero 和 Visual Grid 之间）
- [x] 三个系列分组（Painting / Sculpture / Installation）
- [x] 横滑展示作品缩略图
- [x] 语言切换系列名同步
- [x] 悬停微缩放效果
- [x] 移动端适配
- [x] 提交 spec / plan / implementation commit
- [x] GitHub push → Cloudflare Pages 自动部署
- [x] 最终线上验收
