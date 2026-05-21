# SPEC: Home Series Carousel

## Overview

在首页 Hero 和 Visual Grid 之间新增一个横向滚动的 Series Carousel，参考 Jeff Koons 首页系列展示风格，让用户可以按系列浏览作品。

## Layout Position

```
[Hero — 全屏艺术家名]
         ↓
[Series Carousel]  ← 新增
         ↓
[Visual Grid — 精选作品瀑布流]
         ↓
[About the Artist]
         ↓
[News]
```

## Design Language

| 属性 | 值 |
|------|-----|
| 背景 | `bg-background`（与页面一致，无独立背景） |
| 上边框 | `border-t border-divider` |
| 内边距 | `py-16 lg:py-24`，左右 `px-6 lg:px-16` |
| 字体 | `text-xs font-medium uppercase tracking-[0.25em]` 标签文字 |
| 动效 | 横向滚动，snap，悬停有微缩放 |

## Component: SeriesCarousel

### Data Structure

在 `src/data/works.json` 中，每件作品已有 `category` 字段（Paining / Sculpture / Installation）。以此分组为三个系列：

| category | 系列名 EN | 系列名 ZH |
|----------|-----------|-----------|
| Painting | Painting | 绘画 |
| Sculpture | Sculpture | 雕塑 |
| Installation | Installation | 装置 |

### Component Spec

```tsx
// 布局
<section className="border-t border-divider py-16 lg:py-24">
  {/* 系列列表 — 垂直堆叠 */}
  {SERIES.map(series => (
    <div key={series.key} className="mb-8 last:mb-0">
      {/* 系列标题行 */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          {series.name[lang]}
        </span>
        <span className="text-xs text-secondary/60">{series.count} works</span>
      </div>
      {/* 横向滚动轨道 */}
      <div className="series-track overflow-x-auto scroll-smooth...">
        {series.works.map(work => (
          <Link href={`/works/${work.slug}`} key={work.slug}>
            <div className="series-card shrink-0 w-[280px]...">
              <Image src={work.image} alt={work.title} fill className="object-cover" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  ))}
</section>
```

### Visual Specs

- **滚动轨道**：高度 `h-48`（192px），图片 `h-40 w-40`（160px × 160px 正方形）
- **间距**：图片间距 `gap-3`（12px），系列之间 `mb-8`（32px）
- **snap**：`scroll-snap-x mandatory snap-x`，每张图片 `snap-start`
- **悬停**：图片 `group-hover:scale-[1.04]` + 遮罩 `bg-foreground/0→[0.05]`
- **移动端**：显示 2.5 张（`w-[140px]`），手势横滑

### Interaction

1. 横向滚动用鼠标滚轮（`wheel` 事件转横向）
2. 移动端手势横滑
3. 悬停显示作品标题小字
4. 点击跳转 `/works?series=Painting`（后续实现筛选联动）

### Language

系列标题跟随全局语言切换，无需刷新页面。

## Implementation Files

| 文件 | 操作 |
|------|------|
| `src/data/works.json` | 无需修改（已用 category 分组） |
| `src/components/SeriesCarousel.tsx` | 新建 |
| `src/components/HomePage.tsx` | 在 Hero 和 Visual Grid 之间引入 SeriesCarousel |
| `src/app/page.tsx` | 无需修改（已有 HomePage） |

## Acceptance Criteria

1. `npm run build` 通过，无 TypeScript / ESLint 错误
2. 本地 `http://localhost:3000` 首页可见 Series Carousel
3. 三个系列（Painting / Sculpture / Installation）各自横滑正常
4. 桌面端鼠标滚轮可横向滚动，移动端手势正常
5. 语言切换（EN ↔ 中文）系列名同步切换
6. 与现有 Hero / Visual Grid / About / News 无布局冲突
7. GitHub push 触发 Cloudflare Pages 部署成功
