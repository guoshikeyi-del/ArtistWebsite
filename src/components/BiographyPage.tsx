"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import artist from "@/data/artist.json";
import { useLanguage } from "@/context/LanguageContext";

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

export default function BiographyPage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <div className="min-h-screen bg-background">
      {/* ───── Hero: Full-width image + artist name ───── */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/data-paintings.jpg"
          alt={isZh ? artist.nameZh : artist.name}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {/* Artist name */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 lg:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-extralight leading-[0.9] tracking-[-0.02em] text-foreground"
          >
            {isZh ? artist.nameZh : artist.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-3 text-sm tracking-[0.2em] uppercase text-secondary"
          >
            {artist.born} — {artist.based}
          </motion.p>
        </div>
      </div>

      {/* ───── Biography + Statement ───── */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left: section labels */}
          <div className="lg:col-span-3 space-y-16">
            <section>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "简介" : "Biography"}
              </h2>
            </section>
            <section>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "艺术家自述" : "Artist Statement"}
              </h2>
            </section>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-9 space-y-24">
            {/* Biography text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base leading-[1.85] text-foreground/80"
            >
              {isZh ? artist.bioZh : artist.bioEn}
            </motion.p>

            {/* Statement */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-l-2 border-divider pl-8"
            >
              <p className="text-base leading-[1.85] italic text-foreground/70">
                &ldquo;{isZh ? artist.statementZh : artist.statementEn}&rdquo;
              </p>
            </motion.blockquote>
          </div>
        </div>

        {/* ───── CV Sections ───── */}
        <div className="mt-32 space-y-24 border-t border-divider pt-24">
          {/* Education */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "教育背景" : "Education"}
              </h2>
            </div>
            <div className="lg:col-span-9">
              <div className="divide-y divide-divider">
                {artist.education.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    custom={i}
                    className="flex items-start gap-8 py-4"
                  >
                    <span className="shrink-0 text-xs tabular-nums text-secondary">{item.year}</span>
                    <span className="text-sm text-foreground">{item.description}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "获奖" : "Awards"}
              </h2>
            </div>
            <div className="lg:col-span-9">
              <div className="divide-y divide-divider">
                {artist.awards.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    custom={i}
                    className="flex items-start gap-8 py-4"
                  >
                    <span className="shrink-0 text-xs tabular-nums text-secondary">{item.year}</span>
                    <span className="text-sm text-foreground">{item.description}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "公共收藏" : "Public Collections"}
              </h2>
            </div>
            <div className="lg:col-span-9">
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="space-y-3"
              >
                {artist.collections.map((collection, i) => (
                  <motion.li
                    key={collection}
                    variants={fadeUp}
                    custom={i}
                    className="text-sm text-foreground/80"
                  >
                    {collection}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
