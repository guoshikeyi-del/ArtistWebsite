"use client";

import { useEffect, useRef } from "react";
import { useDynamicBg } from "@/context/DynamicBgContext";

export function DynamicBackground() {
  const { dynamicBg } = useDynamicBg();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!dynamicBg) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const blobs = [
      { hue: 280, saturation: 60, x: 0.3, y: 0.3, radius: 0.4, speedX: 0.3, speedY: 0.2 },
      { hue: 200, saturation: 50, x: 0.7, y: 0.5, radius: 0.35, speedX: -0.2, speedY: 0.3 },
      { hue: 330, saturation: 45, x: 0.5, y: 0.7, radius: 0.3, speedX: 0.25, speedY: -0.25 },
      { hue: 160, saturation: 40, x: 0.2, y: 0.6, radius: 0.25, speedX: -0.15, speedY: 0.2 },
    ];

    const draw = () => {
      timeRef.current += 0.003;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      blobs.forEach((blob, i) => {
        // Organic movement influenced by time, mouse, and scroll
        const offsetX = Math.sin(t * blob.speedX + i * 1.5) * 0.15;
        const offsetY = Math.cos(t * blob.speedY + i * 2.0) * 0.12;

        // Mouse influence (subtle attraction)
        const mouseInfluenceX = (mx - 0.5) * 0.08;
        const mouseInfluenceY = (my - 0.5) * 0.08;

        // Scroll influence (vertical shift)
        const scrollShift = scroll * 0.2 - 0.1;

        const cx = (blob.x + offsetX + mouseInfluenceX) * w;
        const cy = (blob.y + offsetY + mouseInfluenceY + scrollShift) * h;
        const r = blob.radius * Math.max(w, h);

        // Shift hue slightly over time and with scroll
        const hue = blob.hue + Math.sin(t + i) * 20 + scroll * 30;
        const sat = blob.saturation + Math.sin(t * 0.5 + i * 0.7) * 10;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `hsla(${hue}, ${sat}%, 75%, 0.24)`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${sat}%, 70%, 0.12)`);
        gradient.addColorStop(1, `hsla(${hue}, ${sat}%, 65%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dynamicBg]);

  if (!dynamicBg) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
