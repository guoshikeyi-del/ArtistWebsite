"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import works from "@/data/works.json";
import artist from "@/data/artist.json";
import { useLanguage } from "@/context/LanguageContext";
import SeriesCarousel from "./SeriesCarousel";

const featured = works.filter((w) => w.featured).slice(0, 6);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <div className="bg-background">
      {/* ───── Hero ───── */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-10 pb-16 md:px-14 lg:px-20 xl:px-24 lg:pb-24 -mt-24">
        {/* Name — monumental */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(3rem,10vw,9rem)] font-extralight leading-[0.9] tracking-[-0.03em] text-foreground"
        >
          {isZh ? artist.nameZh : artist.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-sm tracking-[0.2em] uppercase text-secondary"
        >
          {artist.based}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-10 w-px bg-secondary/40"
          />
        </motion.div>
      </section>

      {/* ───── Series Carousel ───── */}
      <SeriesCarousel />

      {/* ───── Visual Grid — asymmetric, gallery-like ───── */}
      <section className="mx-auto max-w-[1400px] px-10 pb-32 md:px-14 lg:px-20 xl:px-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
        >
          {/* Row 1 — large left, small right */}
          <motion.div variants={fadeUp} custom={0} className="md:col-span-7 md:row-span-2">
            <div className="group relative aspect-[4/3] overflow-hidden bg-divider">
              <Image
                src={featured[0].image}
                alt={featured[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority
              />
            </div>
            <p className="mt-3 text-xs tracking-wide text-secondary">
              {featured[0].title}, {featured[0].year}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="md:col-span-5">
            <div className="group relative aspect-[4/3] overflow-hidden bg-divider">
              <Image
                src={featured[1].image}
                alt={featured[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <p className="mt-3 text-xs tracking-wide text-secondary">
              {featured[1].title}, {featured[1].year}
            </p>
          </motion.div>

          {/* Row 2 — small left offset, medium right */}
          <motion.div variants={fadeUp} custom={2} className="md:col-span-5 md:mt-12">
            <div className="group relative aspect-[3/4] overflow-hidden bg-divider">
              <Image
                src={featured[2].image}
                alt={featured[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <p className="mt-3 text-xs tracking-wide text-secondary">
              {featured[2].title}, {featured[2].year}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="md:col-span-7">
            <div className="group relative aspect-[16/9] overflow-hidden bg-divider">
              <Image
                src={featured[3].image}
                alt={featured[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <p className="mt-3 text-xs tracking-wide text-secondary">
              {featured[3].title}, {featured[3].year}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── Selected Works ───── */}
      <section className="border-t border-divider">
        <div className="mx-auto max-w-[1400px] px-10 py-24 md:px-14 lg:px-20 xl:px-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "精选作品" : "Selected Works"}
              </h2>
            </div>
            <Link
              href="/works"
              className="text-xs tracking-wide text-secondary transition-colors hover:text-foreground"
            >
              {isZh ? "查看全部 →" : "View all →"}
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-16"
          >
            {featured.map((work, i) => (
              <motion.div key={work.slug} variants={fadeUp} custom={i}>
                <Link href={`/works/${work.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-divider">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.04]" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="text-sm font-normal text-foreground transition-colors group-hover:text-hover">
                      {isZh ? work.titleZh : work.title}
                    </h3>
                    <span className="text-xs text-secondary">{work.year}</span>
                  </div>
                  <p className="mt-1 text-xs text-secondary">{work.medium}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── About the Artist ───── */}
      <section className="border-t border-divider">
        <div className="mx-auto max-w-[1400px] px-10 py-24 md:px-14 lg:px-20 xl:px-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-4"
            >
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                {isZh ? "关于艺术家" : "About the Artist"}
              </h2>
              <p className="mt-2 text-sm text-secondary">
                {artist.born}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-8"
            >
              <p className="max-w-2xl text-base leading-[1.85] text-foreground/80">
                {isZh ? artist.bioZh : artist.bioEn}
              </p>
              <Link
                href="/biography"
                className="mt-8 inline-block text-xs tracking-wide text-secondary transition-colors hover:text-foreground"
              >
                {isZh ? "阅读更多 →" : "Read more →"}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── News ───── */}
      <section className="border-t border-divider">
        <div className="mx-auto max-w-[1400px] px-10 py-24 md:px-14 lg:px-20 xl:px-24 lg:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 text-xs font-medium uppercase tracking-[0.25em] text-secondary"
          >
            {isZh ? "动态" : "News"}
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-divider"
          >
            {artist.news.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group flex cursor-default flex-col gap-2 py-6 transition-colors hover:bg-foreground/[0.02] sm:flex-row sm:items-start sm:gap-8"
              >
                <span className="shrink-0 pt-0.5 text-xs tabular-nums text-secondary">
                  {item.date}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-foreground transition-colors group-hover:text-hover">
                    {item.title}
                  </p>
                  <span className="mt-1 inline-block text-xs uppercase tracking-wider text-secondary/60">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
