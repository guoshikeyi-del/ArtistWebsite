"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

            {/* Horizontal scroll track with snap */}
            <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth series-track">
              <div className="flex gap-3 pl-6 lg:pl-16 pr-6 lg:pr-16">
                {catWorks.map((work) => (
                  <Link
                    href={`/works/${work.slug}`}
                    key={work.slug}
                    className="group shrink-0 block snap-start"
                  >
                    {/* Card with shine overlay */}
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
                      {/* Shine sweep effect */}
                      <div className="shine-sweep absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
        .series-track::-webkit-scrollbar { display: none; }
        .series-track { -ms-overflow-style: none; scrollbar-width: none; }
        .shine-sweep {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.08) 45%,
            rgba(255,255,255,0.15) 50%,
            rgba(255,255,255,0.08) 55%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: none;
        }
        .group:hover .shine-sweep {
          animation: shine-sweep 0.6s ease-out forwards;
        }
        @keyframes shine-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
