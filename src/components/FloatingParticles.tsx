import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  count?: number;
  interactive?: boolean;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 35 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.3,
      alphaChange: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.4 ? "214, 173, 85" : "255, 179, 71", // gold or amber
    }));

    // Twinkling stars in background
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.7),
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.002,
      fadeDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        s.alpha += s.fadeSpeed * s.fadeDir;
        if (s.alpha > 0.85) {
          s.alpha = 0.85;
          s.fadeDir = -1;
        } else if (s.alpha < 0.15) {
          s.alpha = 0.15;
          s.fadeDir = 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 221, 160, ${s.alpha * 0.6})`;
        ctx.fill();
      }

      // Render floating embers
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.alphaChange;

        if (p.opacity > 0.85) {
          p.opacity = 0.85;
          p.alphaChange = -Math.abs(p.alphaChange);
        } else if (p.opacity < 0.15) {
          p.opacity = 0.15;
          p.alphaChange = Math.abs(p.alphaChange);
        }

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
