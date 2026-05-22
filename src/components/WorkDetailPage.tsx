"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import works from "@/data/works.json";
import { useLanguage } from "@/context/LanguageContext";

type Work = (typeof works)[number];

/* ───── Lightbox ───── */
function Lightbox({
  work,
  onClose,
  onPrev,
  onNext,
}: {
  work: Work;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 text-background/70 transition-colors hover:text-background"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 z-10 text-background/70 transition-colors hover:text-background"
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 z-10 text-background/70 transition-colors hover:text-background"
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={work.slug}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative h-[80vh] w-[80vw] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain"
          sizes="80vw"
          priority
        />
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-background/70">
          {work.title}, {work.year}
        </p>
      </div>
    </motion.div>
  );
}

/* ───── Detail Page ───── */
export default function WorkDetailPage({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const work = works.find((w) => w.slug === slug);

  const currentIndex = work ? works.indexOf(work) : 0;

  const handlePrev = useCallback(() => {
    const prev = (currentIndex - 1 + works.length) % works.length;
    window.location.href = `/works/${works[prev].slug}`;
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % works.length;
    window.location.href = `/works/${works[next].slug}`;
  }, [currentIndex]);

  if (!work) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-secondary">Work not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-10 pt-8 pb-12 md:px-14 md:pt-12 md:pb-16 lg:px-20 xl:px-24">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/works"
            className="text-xs tracking-wide text-secondary transition-colors hover:text-foreground"
          >
            ← {isZh ? "返回作品" : "Back to Works"}
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="lg:col-span-8"
          >
            <div
              className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-divider"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="lg:col-span-4"
          >
            <h1 className="text-2xl font-light tracking-tight text-foreground">
              {isZh && work.titleZh ? work.titleZh : work.title}
            </h1>
            {work.titleZh && isZh && (
              <p className="mt-1 text-base text-secondary">{work.title}</p>
            )}

            <div className="mt-8 space-y-4 border-t border-divider pt-8">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">{isZh ? "年份" : "Year"}</span>
                <span className="text-foreground">{work.year}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">{isZh ? "媒介" : "Medium"}</span>
                <span className="text-foreground text-right max-w-[60%]">{work.medium}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">{isZh ? "尺寸" : "Dimensions"}</span>
                <span className="text-foreground">{work.dimensions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">{isZh ? "类别" : "Category"}</span>
                <span className="text-foreground">{work.category}</span>
              </div>
            </div>

            {work.description && (
              <p className="mt-8 text-sm leading-[1.85] text-foreground/70">
                {isZh && work.descriptionZh ? work.descriptionZh : work.description}
              </p>
            )}

            {/* Navigation */}
            <div className="mt-12 flex gap-4 border-t border-divider pt-8">
              <button
                onClick={handlePrev}
                className="text-xs tracking-wide text-secondary transition-colors hover:text-foreground"
              >
                ← {isZh ? "上一篇" : "Previous"}
              </button>
              <button
                onClick={handleNext}
                className="text-xs tracking-wide text-secondary transition-colors hover:text-foreground"
              >
                {isZh ? "下一篇" : "Next"} →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            work={work}
            onClose={() => setLightboxOpen(false)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
