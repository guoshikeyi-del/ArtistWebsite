"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useDynamicBg } from "@/context/DynamicBgContext";
import { MobileMenuBackground } from "./MobileMenuBackground";

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
  const { theme, toggleTheme } = useTheme();
  const { dynamicBg, toggleDynamicBg } = useDynamicBg();
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.min(window.scrollY / 100, 1);
      setScrollOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const navLinks = NAV_LINKS[lang];

  // Background color based on theme
  const bgColor = menuOpen
    ? "transparent"
    : theme === "dark"
      ? `rgba(33, 29, 37, ${scrollOpacity * 0.95})`
      : `rgba(255, 255, 255, ${scrollOpacity * 0.95})`;

  const borderColor = theme === "dark"
    ? `rgba(58, 53, 64, ${scrollOpacity * 0.5})`
    : `rgba(229, 229, 229, ${scrollOpacity * 0.5})`;

  return (
    <>
      {/* Mobile full-screen menu — OUTSIDE header to avoid backdrop-filter containing block issue */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center md:hidden overflow-hidden"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            {/* Dynamic background in mobile menu */}
            {dynamicBg && <MobileMenuBackground />}
            <ul className="relative z-10 flex flex-col items-center gap-8">
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
            <div className="relative z-10 mt-12 flex flex-col items-center gap-6">
              <button
                onClick={() => { toggleLang(); setMenuOpen(false); }}
                className="text-xl tracking-widest uppercase text-secondary transition-colors hover:text-foreground"
              >
                {lang === "en" ? "中文" : "English"}
              </button>
              <button
                onClick={toggleTheme}
                className="text-xl tracking-widest uppercase text-secondary transition-colors hover:text-foreground"
              >
                {theme === "dark"
                  ? (lang === "en" ? "Light Mode" : "日间模式")
                  : (lang === "en" ? "Dark Mode" : "黑夜模式")}
              </button>
              <button
                onClick={toggleDynamicBg}
                className={cn(
                  "text-xl tracking-widest uppercase transition-colors hover:text-foreground",
                  dynamicBg ? "text-foreground" : "text-secondary"
                )}
              >
                {dynamicBg
                  ? (lang === "en" ? "Static BG" : "静态底板")
                  : (lang === "en" ? "Dynamic BG" : "动态底板")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 transition-colors duration-300",
          menuOpen ? "z-[60]" : "z-50"
        )}
        style={{
          backgroundColor: bgColor,
          backdropFilter: scrollOpacity > 0 && !menuOpen ? `blur(${scrollOpacity * 12}px)` : "none",
          borderBottom: menuOpen ? "none" : `1px solid ${borderColor}`,
        }}
      >
        <nav className="flex h-16 items-center justify-between px-10 md:px-14 lg:px-20 xl:px-24">
          {/* Artist name — left */}
          <Link
            href="/"
            className="text-base font-medium tracking-tight text-foreground transition-colors hover:text-hover uppercase"
          >
            Artist Name
          </Link>

          {/* Desktop nav — right */}
          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-[13px] tracking-wide transition-colors hover:text-foreground",
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
            <li>
              <button
                onClick={toggleLang}
                className="text-xs tracking-widest uppercase text-secondary transition-colors hover:text-foreground border border-divider px-2.5 py-1 rounded-sm"
              >
                {lang === "en" ? "中" : "EN"}
              </button>
            </li>
            {/* Theme toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="text-secondary transition-colors hover:text-foreground border border-divider p-1.5 rounded-sm"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </li>
            {/* Dynamic background toggle */}
            <li>
              <button
                onClick={toggleDynamicBg}
                className={cn(
                  "text-xs tracking-widest uppercase transition-colors border border-divider px-2.5 py-1 rounded-sm",
                  dynamicBg ? "text-foreground bg-foreground/[0.06]" : "text-secondary hover:text-foreground"
                )}
                aria-label={dynamicBg ? "Disable dynamic background" : "Enable dynamic background"}
              >
                {dynamicBg ? "✦" : "✧"}
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
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
      </header>
    </>
  );
}
