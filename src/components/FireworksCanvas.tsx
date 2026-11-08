import React, { useEffect, useRef } from "react";

interface FireworksCanvasProps {
  isActive: boolean;
  className?: string;
}

interface SkyParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  friction: number;
  flicker: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

interface SkyRocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  type: "grand_chrysanthemum" | "golden_willow" | "multi_ring" | "crackle_palm";
  trail: { x: number; y: number }[];
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  isActive,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
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

    // Deep midnight sky palette + fireworks colors
    const fireworkColors = [
      "214, 173, 85",   // Royal Gold
      "245, 221, 160",  // Champagne
      "255, 179, 71",   // Amber Glow
      "255, 245, 223",  // Warm Ivory / Platinum
      "255, 107, 107",  // Festive Ruby
      "78, 205, 196",   // Festive Turquoise
      "255, 230, 109",  // Bright Golden Spark
      "255, 159, 243",  // Soft Lotus Violet
    ];

    const isMobile = window.innerWidth < 768;

    // Twinkling background stars
    const starCount = isMobile ? 50 : 90;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75),
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.006 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const rockets: SkyRocket[] = [];
    const particles: SkyParticle[] = [];

    // Launch rocket
    const launchRocket = (startX?: number, targetX?: number, targetY?: number) => {
      const sx = startX ?? (Math.random() * (width * 0.8) + width * 0.1);
      const tx = targetX ?? (sx + (Math.random() - 0.5) * (width * 0.2));
      const ty = targetY ?? (Math.random() * (height * 0.42) + height * 0.12);

      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      const types: ("grand_chrysanthemum" | "golden_willow" | "multi_ring" | "crackle_palm")[] = [
        "grand_chrysanthemum",
        "golden_willow",
        "multi_ring",
        "crackle_palm",
      ];
      const type = types[Math.floor(Math.random() * types.length)];

      const speed = Math.random() * 2.5 + (isMobile ? 8.0 : 10.0);
      const dx = tx - sx;
      const dy = ty - height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      rockets.push({
        x: sx,
        y: height,
        targetX: tx,
        targetY: ty,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        color,
        type,
        trail: [],
      });
    };

    // Detonate into distinct fireworks
    const explode = (x: number, y: number, color: string, type: "grand_chrysanthemum" | "golden_willow" | "multi_ring" | "crackle_palm") => {
      let count = isMobile ? 55 : 95;
      if (type === "golden_willow") count = isMobile ? 65 : 120;
      if (type === "crackle_palm") count = isMobile ? 45 : 75;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        let speed = Math.random() * 4.5 + 1.8;
        let gravity = 0.04;
        let friction = 0.97;
        let decay = Math.random() * 0.012 + 0.008;
        let size = Math.random() * 2.0 + 1.2;
        let pColor = color;
        let flicker = false;

        if (type === "golden_willow") {
          // Cascading long-burning golden willow
          speed = Math.random() * 3.5 + 1.0;
          gravity = 0.055;
          friction = 0.985;
          decay = Math.random() * 0.006 + 0.005;
          pColor = "245, 221, 160"; // shimmering champagne gold
        } else if (type === "multi_ring") {
          // Multi ring: outer shell + contrasting inner core
          const isInner = i % 2 === 0;
          speed = isInner ? 2.5 + Math.random() * 0.8 : 5.0 + Math.random() * 0.8;
          pColor = isInner ? "255, 107, 107" : color;
          decay = Math.random() * 0.014 + 0.01;
        } else if (type === "crackle_palm") {
          // Crackling sizzling sparks
          speed = Math.random() * 5.2 + 2.0;
          decay = Math.random() * 0.02 + 0.012;
          flicker = true;
          pColor = "255, 230, 109";
        }

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay,
          color: pColor,
          size,
          gravity,
          friction,
          flicker,
          trail: [],
        });
      }
    };

    // User Interactive Click / Tap on Sky: launch rocket directly to tap position
    const handleCanvasClick = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clickX = 0;
      let clickY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clickX = e.touches[0].clientX - rect.left;
          clickY = e.touches[0].clientY - rect.top;
        }
      } else {
        clickX = (e as MouseEvent).clientX - rect.left;
        clickY = (e as MouseEvent).clientY - rect.top;
      }

      launchRocket(clickX + (Math.random() - 0.5) * 50, clickX, Math.max(70, clickY));
    };

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasClick, { passive: true });

    // Initial synchronized festive salutes
    launchRocket(width * 0.25, width * 0.25, height * 0.28);
    setTimeout(() => launchRocket(width * 0.75, width * 0.75, height * 0.22), 350);
    setTimeout(() => launchRocket(width * 0.5, width * 0.5, height * 0.18), 700);

    let lastLaunch = performance.now();
    let nextInterval = 800 + Math.random() * 1200;

    const loop = (timestamp: number) => {
      // Midnight navy gradient background with soft persistence trail
      ctx.fillStyle = "rgba(8, 13, 28, 0.24)";
      ctx.fillRect(0, 0, width, height);

      // Draw twinkling stars
      for (const s of stars) {
        s.alpha += s.speed * s.dir;
        if (s.alpha > 0.85) {
          s.alpha = 0.85;
          s.dir = -1;
        } else if (s.alpha < 0.15) {
          s.alpha = 0.15;
          s.dir = 1;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 221, 160, ${s.alpha * 0.75})`;
        ctx.fill();
      }

      // Auto launch fireworks continuously across varying positions
      if (timestamp - lastLaunch > nextInterval) {
        launchRocket();
        if (Math.random() < 0.4) {
          // Double burst
          setTimeout(() => launchRocket(), 200 + Math.random() * 300);
        }
        lastLaunch = timestamp;
        nextInterval = 900 + Math.random() * 1400;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Rocket spark head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r.color})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgb(${r.color})`;
        ctx.fill();

        // Rocket ascending sparkle trail
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2 * (t / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r.color}, ${(t / r.trail.length) * 0.6})`;
          ctx.fill();
        }

        // Apex detonation
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color, r.type);
          rockets.splice(i, 1);
        }
      }

      // Update and draw burst particles
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

        let currentAlpha = p.alpha;
        if (p.flicker && Math.random() > 0.45) {
          currentAlpha *= 0.35;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${p.color}, ${currentAlpha * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleCanvasClick);
      canvas.removeEventListener("touchstart", handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full cursor-crosshair ${className}`}
      aria-label="Interactive Sky Lit Just For You Fireworks"
    />
  );
};
