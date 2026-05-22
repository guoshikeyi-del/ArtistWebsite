"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import works from "@/data/works.json";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORIES_EN = ["All", "Painting", "Sculpture", "Installation", "Digital"];
const CATEGORIES_ZH = ["全部", "绘画", "雕塑", "装置", "数字媒体"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function WorksPage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const categories = isZh ? CATEGORIES_ZH : CATEGORIES_EN;
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const filtered =
    activeIdx === 0 ? works : works.filter((w) => w.category === CATEGORIES_EN[activeIdx]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-10 pt-8 md:px-14 md:pt-12 lg:px-20 xl:px-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-secondary"
        >
          {isZh ? "作品" : "Works"}
        </motion.h1>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4 sm:gap-6 border-b border-divider pb-6"
        >
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "text-sm tracking-wide transition-colors duration-200",
                activeIdx === idx
                  ? "text-foreground"
                  : "text-secondary hover:text-foreground"
              )}
            >
              {cat}
              {activeIdx === idx && (
                <motion.div
                  layoutId="filter-underline"
                  className="mt-1 h-px bg-foreground"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] px-10 py-12 md:px-14 md:py-16 lg:px-20 xl:px-24">
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                key={work.slug}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                custom={i}
              >
                <Link href={`/works/${work.slug}`} className="group block">
                  {/* Image card with shine sweep */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-divider">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.04]" />
                    {/* Shine sweep */}
                    <div className="shine-sweep absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h2 className="text-sm text-foreground transition-colors group-hover:text-hover">
                      {isZh ? work.titleZh : work.title}
                    </h2>
                    <span className="text-xs text-secondary">{work.year}</span>
                  </div>
                  <p className="mt-1 text-xs text-secondary">{work.medium}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .shine-sweep {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.1) 45%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.1) 55%,
            transparent 60%
          );
          background-size: 200% 100%;
        }
        .group:hover .shine-sweep {
          animation: shine-sweep 0.7s ease-out forwards;
        }
        @keyframes shine-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
