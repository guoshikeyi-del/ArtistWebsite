"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type Language = "en" | "zh";

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
  setLang: () => {},
});

const STORAGE_KEY = "artist-portfolio-lang";

// Stable snapshot for SSR — always returns "en" to match server render
const subscribe = () => () => {};
const getSnapshot = () => "en";
const getServerSnapshot = () => "en";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore bridges SSR/client hydration safely
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as Language;

  const [isClientLang, setIsClientLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // On client only: read localStorage and optionally browser language
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "en" || stored === "zh") {
      setIsClientLang(stored);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setIsClientLang(browserLang.startsWith("zh") ? "zh" : "en");
    }
    setMounted(true);
  }, []);

  const finalLang = mounted ? isClientLang : "en";

  const setLang = (newLang: Language) => {
    setIsClientLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const toggleLang = () => {
    setLang(finalLang === "en" ? "zh" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang: finalLang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
