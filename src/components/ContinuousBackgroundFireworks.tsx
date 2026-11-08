import React, { useEffect, useRef } from "react";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  gravity: number;
  friction: number;
  flicker: boolean;
  trail?: { x: number; y: number; alpha: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  type: "chrysanthemum" | "willow" | "crackle" | "ring";
  trail: { x: number; y: number }[];
}

export const ContinuousBackgroundFireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Warm festive Diwali palette: Rich gold, warm champagne, amber glow, soft ivory, subtle rose/ruby
    const colorPalette = [
      "214, 173, 85",   // Rich Gold
      "245, 221, 160",  // Warm Champagne
      "255, 179, 71",   // Amber Glow
      "255, 245, 223",  // Soft Ivory
      "255, 215, 0",    // Brilliant Gold
      "248, 177, 149",  // Subtle Rose Gold
      "255, 107, 107",  // Delicate Festive Ruby
    ];

    const rockets: Rocket[] = [];
    const particles: SparkParticle[] = [];

    const isMobile = window.innerWidth < 768;

    // Launch a rocket towards an irregular sky position
    const launchRocket = (customX?: number, customTargetY?: number) => {
      // Pick random X across entire width (10% to 90%)
      const startX = customX ?? (Math.random() * (width * 0.8) + width * 0.1);
      // Target Y is in the upper 15% to 55% of the viewport
      const targetY = customTargetY ?? (Math.random() * (height * 0.4) + height * 0.12);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const types: ("chrysanthemum" | "willow" | "crackle" | "ring")[] = [
        "chrysanthemum",
        "willow",
        "crackle",
        "ring",
      ];
      const type = types[Math.floor(Math.random() * types.length)];

      const distance = height - targetY;
      const speed = Math.random() * 2 + (isMobile ? 6.5 : 8.0);
      const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.18; // slight arc

      rockets.push({
        x: startX,
        y: height,
        targetY,
        vx: Math.cos(angle) * (Math.random() - 0.5) * 1.5,
        vy: -Math.abs(Math.sin(angle) * speed),
        color,
        type,
        trail: [],
      });
    };

    // Detonate into distinct firework types
    const explode = (x: number, y: number, color: string, type: "chrysanthemum" | "willow" | "crackle" | "ring") => {
      let count = isMobile ? 36 : 60;
      if (type === "willow") count = isMobile ? 40 : 75;
      if (type === "crackle") count = isMobile ? 28 : 45;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        let speed = Math.random() * 3.5 + 1.2;
        let gravity = 0.035;
        let friction = 0.965;
        let decay = Math.random() * 0.012 + 0.009;
        let size = Math.random() * 1.8 + 0.8;
        let flicker = false;

        if (type === "willow") {
          // Willow trails: slow drooping golden rain
          speed = Math.random() * 2.8 + 1.0;
          gravity = 0.055;
          friction = 0.98;
          decay = Math.random() * 0.007 + 0.006;
          size = Math.random() * 1.5 + 1.0;
        } else if (type === "crackle") {
          // Sparkling crackle burst
          speed = Math.random() * 4.2 + 1.5;
          decay = Math.random() * 0.02 + 0.015;
          flicker = true;
        } else if (type === "ring") {
          // Circular ring shell
          speed = 2.8 + (i % 2 === 0 ? 0.3 : -0.3);
          decay = Math.random() * 0.014 + 0.01;
        }

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay,
          size,
          color,
          gravity,
          friction,
          flicker,
          trail: type === "willow" ? [] : undefined,
        });
      }
    };

    // Natural irregular launcher timer
    let lastLaunch = performance.now();
    let nextInterval = 1200 + Math.random() * 1800; // irregular natural pacing

    // Spawn initial gentle atmospheric bursts across left and right
    setTimeout(() => launchRocket(width * 0.25, height * 0.3), 400);
    setTimeout(() => launchRocket(width * 0.75, height * 0.25), 1300);

    const render = (now: number) => {
      // Clear with very light trails so it stays crisp and doesn't darken the deep navy background
      ctx.clearRect(0, 0, width, height);

      // Launch naturally at irregular intervals
      if (now - lastLaunch > nextInterval) {
        launchRocket();
        // Occasional double burst
        if (Math.random() < 0.25) {
          setTimeout(() => launchRocket(), 350 + Math.random() * 400);
        }
        lastLaunch = now;
        nextInterval = 1600 + Math.random() * 2400; // irregular intervals
      }

      // Update & draw ascending rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Rocket spark trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r.color}, 0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r.color}, 0.9)`;
        ctx.fill();

        // Check apex reached
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color, r.type);
          rockets.splice(i, 1);
        }
      }

      // Update & draw sparkling burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        let renderAlpha = p.alpha;
        if (p.flicker && Math.random() > 0.4) {
          renderAlpha *= 0.45;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Kept subtle and atmospheric (max ~0.65 opacity) so background text remains 100% readable
        ctx.fillStyle = `rgba(${p.color}, ${renderAlpha * 0.65})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.color}, ${renderAlpha * 0.8})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
      aria-hidden="true"
    />
  );
};
