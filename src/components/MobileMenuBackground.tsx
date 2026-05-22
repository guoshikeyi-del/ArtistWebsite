"use client";

import { useEffect, useRef } from "react";

export function MobileMenuBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
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

    const blobs = [
      { hue: 280, saturation: 60, x: 0.25, y: 0.25, radius: 0.5, speedX: 0.4, speedY: 0.3 },
      { hue: 200, saturation: 50, x: 0.75, y: 0.4, radius: 0.45, speedX: -0.3, speedY: 0.4 },
      { hue: 330, saturation: 45, x: 0.5, y: 0.75, radius: 0.4, speedX: 0.35, speedY: -0.3 },
    ];

    const draw = () => {
      timeRef.current += 0.004;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      blobs.forEach((blob, i) => {
        const offsetX = Math.sin(t * blob.speedX + i * 2.0) * 0.2;
        const offsetY = Math.cos(t * blob.speedY + i * 1.5) * 0.15;

        const cx = (blob.x + offsetX) * w;
        const cy = (blob.y + offsetY) * h;
        const r = blob.radius * Math.max(w, h);

        const hue = blob.hue + Math.sin(t * 0.8 + i) * 25;
        const sat = blob.saturation + Math.sin(t * 0.5 + i * 0.7) * 10;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `hsla(${hue}, ${sat}%, 75%, 0.22)`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${sat}%, 70%, 0.10)`);
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
