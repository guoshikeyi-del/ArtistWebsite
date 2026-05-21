"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = {
  en: [
    { href: "/works", label: "Works" },
    { href: "/exhibitions", label: "Exhibitions" },
    { href: "/biography", label: "Biography" },
    { href: "/press", label: "Press" },
    { href: "/contact", label: "Contact" },
  ],
  zh: [
    { href: "/works", label: "作品" },
    { href: "/exhibitions", label: "展览" },
    { href: "/biography", label: "简历" },
    { href: "/press", label: "文献" },
    { href: "/contact", label: "联系" },
  ],
};

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();

  const navLinks = NAV_LINKS[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Artist name — left */}
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-foreground transition-colors hover:text-hover"
        >
          Artist Name
        </Link>

        {/* Desktop nav — right */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-foreground",
                  pathname === href
                    ? "text-foreground"
                    : "text-secondary"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="ml-2 text-xs tracking-widest uppercase text-secondary transition-colors hover:text-foreground"
          >
            {lang === "en" ? "中" : "EN"}
          </button>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-2xl tracking-wide transition-colors hover:text-foreground",
                      pathname === href
                        ? "text-foreground"
                        : "text-secondary"
                    )}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => { toggleLang(); setMenuOpen(false); }}
              className="mt-12 text-xl tracking-widest uppercase text-secondary transition-colors hover:text-foreground"
            >
              {lang === "en" ? "中文" : "English"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
