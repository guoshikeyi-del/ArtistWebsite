"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FOOTER_SECTIONS = {
  en: [
    {
      title: "Works",
      links: [
        { label: "All Works", href: "/works" },
        { label: "Painting", href: "/works" },
        { label: "Sculpture", href: "/works" },
        { label: "Installation", href: "/works" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Biography", href: "/biography" },
        { label: "Exhibitions", href: "/exhibitions" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  zh: [
    {
      title: "作品",
      links: [
        { label: "全部作品", href: "/works" },
        { label: "绘画", href: "/works" },
        { label: "雕塑", href: "/works" },
        { label: "装置", href: "/works" },
      ],
    },
    {
      title: "关于",
      links: [
        { label: "简历", href: "/biography" },
        { label: "展览", href: "/exhibitions" },
        { label: "文献", href: "/press" },
        { label: "联系", href: "/contact" },
      ],
    },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export function Footer() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const sections = FOOTER_SECTIONS[isZh ? "zh" : "en"];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-divider bg-background">
      <div className="mx-auto max-w-[1400px] px-10 py-16 md:px-14 lg:px-20 xl:px-24">
        {/* Top row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start"
        >
          {/* Left: artist + email subscribe */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6 max-w-xs">
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
                Artist Name
              </Link>
              <p className="text-sm text-secondary">
                {isZh ? "当代艺术家，工作于上海与柏林" : "Contemporary artist based in Shanghai & Berlin"}
              </p>
            </div>

            {/* Email subscription */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-secondary">
                {isZh ? "邮件订阅" : "Newsletter"}
              </p>
              {subscribed ? (
                <p className="text-sm text-foreground/70">
                  {isZh ? "谢谢订阅！" : "Thank you for subscribing."}
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isZh ? "你的邮箱" : "your@email.com"}
                    className="w-full border-b border-divider bg-transparent py-2 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/50 focus:border-foreground"
                  />
                  <button
                    type="submit"
                    className="shrink-0 text-xs uppercase tracking-widest text-secondary transition-colors hover:text-foreground"
                  >
                    {isZh ? "订阅" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Center: section link columns */}
          <div className="flex gap-16">
            {sections.map((section, si) => (
              <motion.div key={section.title} variants={fadeUp} custom={si + 1}>
                <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-secondary">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-secondary transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Right: social icons */}
          <motion.div variants={fadeUp} custom={3} className="flex items-start gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-secondary transition-colors hover:text-foreground"
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 border-t border-divider pt-6"
        >
          <p className="text-xs text-secondary">
            &copy; 2025 Artist Name. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
