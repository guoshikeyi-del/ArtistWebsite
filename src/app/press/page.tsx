"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const PRESS_ITEMS = {
  en: [
    {
      id: 1,
      publication: "Artforum",
      title: "The New Geometry: Sculpture in the Digital Age",
      date: "March 2025",
      excerpt:
        "An incisive look at how contemporary artists are redefining spatial practice through computational tools and new material languages.",
    },
    {
      id: 2,
      publication: "Frieze",
      title: "Painting After the Internet: A New Manifesto",
      date: "January 2025",
      excerpt:
        "A conversation with emerging voices challenging the assumed death of painting in an era oversaturated with images.",
    },
    {
      id: 3,
      publication: "Art in America",
      title: "Site-Specific Installations That Transform Architecture",
      date: "November 2024",
      excerpt:
        "From abandoned factories to purpose-built pavilions, a new generation of installation artists reshapes how we inhabit space.",
    },
    {
      id: 4,
      publication: "The Art Newspaper",
      title: "Shanghai Biennale 2024: Critical Perspectives",
      date: "September 2024",
      excerpt:
        "The biennale's twelfth edition interrogates themes of diaspora, technology, and ecological urgency across a sprawling roster of international artists.",
    },
    {
      id: 5,
      publication: "Dezeen",
      title: "When Art Meets Architecture: Immersive Spaces at Design Miami/",
      date: "December 2023",
      excerpt:
        "A roundup of the most thought-provoking intersections between fine art and design at this year's fair, featuring large-scale commissions.",
    },
  ],
  zh: [
    {
      id: 1,
      publication: "艺术论坛",
      title: "新几何学：数字时代的雕塑",
      date: "2025年3月",
      excerpt:
        "深入探讨当代艺术家如何通过计算工具和新材料语言重新定义空间实践。",
    },
    {
      id: 2,
      publication: "Frieze",
      title: "互联网之后的绘画：一份新宣言",
      date: "2025年1月",
        excerpt:
        "与挑战\u201C绘画已死\u201D这一假设的新兴声音对话。",
    },
    {
      id: 3,
      publication: "艺术在美国",
      title: "场地特定装置如何改变建筑",
      date: "2024年11月",
      excerpt:
        "从废弃工厂到专门建造的展馆，新一代装置艺术家重塑了我们居住空间的方式。",
    },
    {
      id: 4,
      publication: "艺术新闻",
      title: "上海双年展2024：批评视角",
      date: "2024年9月",
      excerpt:
        "第十二届双年展探讨散居、技术与生态紧迫性等主题。",
    },
    {
      id: 5,
      publication: "Dezeen",
      title: "艺术与建筑的交汇：迈阿密设计展沉浸式空间",
      date: "2023年12月",
      excerpt:
        "本屆博览会中艺术与设计最具思想性的交汇点回顾。",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function PressPage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const items = isZh ? PRESS_ITEMS.zh : PRESS_ITEMS.en;

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
            {isZh ? "文献" : "Press"}
          </h1>
          <p className="mt-4 text-3xl font-medium tracking-tight lg:text-4xl">
            {isZh ? "媒体报道与评论" : "Media & Criticism"}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 h-px bg-divider origin-left"
        />

        {/* Press list */}
        <div className="mt-12 flex flex-col gap-12">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              className="group"
            >
              <div className="flex flex-col gap-3">
                {/* Publication + date row */}
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-widest text-secondary">
                    {item.publication}
                  </span>
                  <span className="text-xs text-secondary/70">{item.date}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-medium leading-snug tracking-tight text-foreground group-hover:text-hover transition-colors">
                  {item.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed text-secondary">
                  {item.excerpt}
                </p>

                {/* Read more */}
                <a
                  href="#"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-secondary transition-colors hover:text-foreground group-hover:gap-3"
                >
                  {isZh ? "阅读全文" : "Read article"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              {/* Separator */}
              {i < items.length - 1 && (
                <div className="mt-10 h-px bg-divider" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
