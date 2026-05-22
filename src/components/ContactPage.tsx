"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const INQUIRY_TYPES_EN = [
  "General Inquiry",
  "Exhibition Proposal",
  "Press / Interview",
  "Purchase / Commission",
  "Collaboration",
];

const INQUIRY_TYPES_ZH = [
  "常规咨询",
  "展览合作",
  "媒体采访",
  "购买 / 委托",
  "跨界合作",
];

export default function ContactPage() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const inquiryTypes = isZh ? INQUIRY_TYPES_ZH : INQUIRY_TYPES_EN;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: inquiryTypes[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-10 pt-8 pb-12 md:px-14 md:pt-12 md:pb-16 lg:px-20 xl:px-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-secondary"
        >
          {isZh ? "联系" : "Contact"}
        </motion.h1>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-16 lg:grid-cols-12 lg:gap-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="lg:col-span-4"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  {isZh ? "工作室" : "Studio"}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  50 Moganshan Road<br />
                  Building 6, Studio 302<br />
                  Shanghai 200060, China
                </p>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  Email
                </h3>
                <p className="mt-3 text-sm text-foreground">
                  studio@artistname.com
                </p>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  {isZh ? "画廊代理" : "Gallery Representation"}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  White Cube — London / Hong Kong<br />
                  Gagosian — Hong Kong
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="lg:col-span-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-64 items-center justify-center border border-divider"
              >
                <div className="text-center">
                  <p className="text-sm text-foreground">
                    {isZh ? "感谢您的来信。" : "Thank you for reaching out."}
                  </p>
                  <p className="mt-2 text-xs text-secondary">
                    {isZh ? "我们将在 48 小时内回复。" : "We will respond within 48 hours."}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-secondary">
                      {isZh ? "姓名" : "Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, name: e.target.value }))
                      }
                      placeholder=" "
                      className="peer w-full border-b border-divider bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-foreground"
                    />
                    <div className="h-px w-0 bg-foreground transition-all duration-300 peer-focus:w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-secondary">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, email: e.target.value }))
                      }
                      placeholder=" "
                      className="peer w-full border-b border-divider bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-foreground"
                    />
                    <div className="h-px w-0 bg-foreground transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>

                {/* Row: Subject + Inquiry Type */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-secondary">
                      {isZh ? "主题" : "Subject"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, subject: e.target.value }))
                      }
                      placeholder=" "
                      className="peer w-full border-b border-divider bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-foreground"
                    />
                    <div className="h-px w-0 bg-foreground transition-all duration-300 peer-focus:w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-secondary">
                      {isZh ? "咨询类型" : "Inquiry Type"}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, inquiryType: e.target.value }))
                        }
                        className="w-full appearance-none border-b border-divider bg-transparent py-3 pr-8 text-sm text-foreground outline-none transition-colors focus:border-foreground cursor-pointer"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {/* Custom arrow */}
                      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-secondary">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="h-px w-0 bg-foreground transition-all duration-300" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-secondary">
                    {isZh ? "留言" : "Message"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, message: e.target.value }))
                    }
                    className="w-full resize-none border-b border-divider bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-foreground px-10 py-3.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    {isZh ? "发送消息" : "Send Message"}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
