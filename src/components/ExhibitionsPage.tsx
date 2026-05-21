"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import exhibitions from "@/data/exhibitions.json";
import { useLanguage } from "@/context/LanguageContext";

interface Exhibition {
  title: string;
  titleZh?: string;
  venue: string;
  venueZh?: string;
  date: string;
  type: string;
}

function useYears(exhibits: Exhibition[]) {
  const years = Array.from(new Set(exhibits.map((e) => e.date)));
  return years.sort((a, b) => b.localeCompare(a)); // desc: newest first
}

function TimelineSection({
  title,
  items,
}: {
  title: string;
  items: Exhibition[];
}) {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const years = useYears(items);

  return (
    <div className="mb-20 last:mb-0">
      {/* Section heading */}
      <h2 className="mb-10 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
        {/* ── Left: sticky year column ── */}
        <div className="md:col-span-3">
          <div className="sticky top-32 space-y-0">
            {years.map((year) => (
              <div key={year} className="flex items-center gap-4 py-4 md:justify-end">
                <span className="text-xs tabular-nums text-secondary/60 md:text-right">
                  {year}
                </span>
                <div className="h-px flex-1 bg-divider md:hidden" />
                <div className="hidden md:block h-px w-4 bg-divider" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: exhibitions ── */}
        <div className="md:col-span-9 md:border-l md:border-divider md:pl-8">
          {years.map((year) => {
            const yearItems = items.filter((e) => e.date === year);
            return (
              <div key={year} className="flex md:block">
                {/* Mobile: inline year label */}
                <div className="shrink-0 md:hidden">
                  <div className="flex items-center gap-3 py-4">
                    <span className="text-xs tabular-nums text-secondary/60">{year}</span>
                    <div className="h-px flex-1 bg-divider" />
                  </div>
                </div>

                {/* Exhibition cards */}
                <div className="flex-1 space-y-6 pb-8">
                  {yearItems.map((ex) => (
                    <motion.div
                      key={`${ex.title}-${ex.date}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="group"
                    >
                      <h3 className="text-sm text-foreground transition-colors group-hover:text-hover">
                        {isZh && ex.titleZh ? ex.titleZh : ex.title}
                      </h3>
                      <p className="mt-1 text-xs text-secondary">
                        {isZh && ex.venueZh ? ex.venueZh : ex.venue}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ExhibitionsPage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-secondary"
        >
          {isZh ? "展览" : "Exhibitions"}
        </motion.h1>

        <div className="mt-16">
          <TimelineSection
            title={isZh ? "个人展览" : "Solo Exhibitions"}
            items={exhibitions.solo}
          />
          <TimelineSection
            title={isZh ? "群展" : "Group Exhibitions"}
            items={exhibitions.group}
          />
        </div>
      </div>
    </div>
  );
}
