"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

export function FloatingScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const updateThumb = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    if (docHeight <= viewHeight) {
      setThumbHeight(0);
      return;
    }
    const ratio = viewHeight / docHeight;
    const height = Math.max(ratio * viewHeight, 40);
    const scrollRatio = window.scrollY / (docHeight - viewHeight);
    const top = scrollRatio * (viewHeight - height);
    setThumbHeight(height);
    setThumbTop(top);
  }, []);

  const showTemporarily = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging) setVisible(false);
    }, 1200);
  }, [dragging]);

  useEffect(() => {
    const onScroll = () => {
      updateThumb();
      showTemporarily();
    };
    const onResize = () => updateThumb();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    updateThumb();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [updateThumb, showTemporarily]);

  // Drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const scrollableHeight = docHeight - viewHeight;
      const trackHeight = viewHeight - thumbHeight;
      const deltaY = e.clientY - dragStartY.current;
      const scrollDelta = (deltaY / trackHeight) * scrollableHeight;
      window.scrollTo(0, dragStartScroll.current + scrollDelta);
    };

    const handleMouseUp = () => {
      setDragging(false);
      showTemporarily();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, thumbHeight, showTemporarily]);

  // Click on track to jump
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (e.target === thumbRef.current) return;
    const viewHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const clickRatio = e.clientY / viewHeight;
    window.scrollTo({ top: clickRatio * (docHeight - viewHeight), behavior: "smooth" });
  }, []);

  if (thumbHeight === 0) return null;

  return (
    <div
      ref={trackRef}
      className="floating-scrollbar fixed top-0 right-[3px] bottom-0 w-[8px] z-[99] cursor-pointer"
      onClick={handleTrackClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => { if (!dragging) setVisible(false); }}
    >
      <div
        ref={thumbRef}
        className="absolute right-0 w-[6px] rounded-full cursor-grab active:cursor-grabbing transition-opacity duration-300"
        style={{
          height: `${thumbHeight}px`,
          top: `${thumbTop}px`,
          opacity: visible || dragging ? 1 : 0,
          background: theme === "dark"
            ? "rgba(255, 255, 255, 0.30)"
            : "rgba(0, 0, 0, 0.20)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => {
          if (thumbRef.current) {
            thumbRef.current.style.background = theme === "dark"
              ? "rgba(255, 255, 255, 0.40)"
              : "rgba(0, 0, 0, 0.30)";
          }
        }}
        onMouseLeave={() => {
          if (thumbRef.current && !dragging) {
            thumbRef.current.style.background = theme === "dark"
              ? "rgba(255, 255, 255, 0.30)"
              : "rgba(0, 0, 0, 0.20)";
          }
        }}
      />
    </div>
  );
}
