"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DynamicBgContextValue {
  dynamicBg: boolean;
  toggleDynamicBg: () => void;
}

const DynamicBgContext = createContext<DynamicBgContextValue>({
  dynamicBg: false,
  toggleDynamicBg: () => {},
});

const STORAGE_KEY = "artist-portfolio-dynamic-bg";

export function DynamicBgProvider({ children }: { children: ReactNode }) {
  const [dynamicBg, setDynamicBg] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "false") {
      setDynamicBg(false);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dynamicBg) {
      root.classList.add("dynamic-bg-active");
    } else {
      root.classList.remove("dynamic-bg-active");
    }
    localStorage.setItem(STORAGE_KEY, String(dynamicBg));
  }, [dynamicBg, mounted]);

  const toggleDynamicBg = () => {
    setDynamicBg((prev) => !prev);
  };

  return (
    <DynamicBgContext.Provider value={{ dynamicBg, toggleDynamicBg }}>
      {children}
    </DynamicBgContext.Provider>
  );
}

export function useDynamicBg() {
  return useContext(DynamicBgContext);
}
