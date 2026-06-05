"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  tail: number;
}

export function StarfieldBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animFrame = 0;
    let time = 0;

    const STAR_COUNT = 300;
    const SHOOTING_STAR_INTERVAL = 4000;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      const w = canvas!.width;
      const h = canvas!.height;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.8 + 0.2,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function spawnShootingStar() {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.3;
      const speed = 4 + Math.random() * 3;
      shootingStars.push({
        x: Math.random() * canvas!.width * 0.8,
        y: Math.random() * canvas!.height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        tail: 20 + Math.random() * 15
      });
    }

    let lastShootingStar = 0;

    function draw(timestamp: number) {
      animFrame = requestAnimationFrame(draw);
      time += 0.01;

      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.clearRect(0, 0, w, h);

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.speed * 10 + star.phase) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fill();
      }

      // Shooting stars
      if (timestamp - lastShootingStar > SHOOTING_STAR_INTERVAL + Math.random() * 2000) {
        spawnShootingStar();
        lastShootingStar = timestamp;
      }

      shootingStars = shootingStars.filter((s) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;
        if (alpha <= 0) return false;

        // Head
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 1.5 * alpha, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200, 180, 255, ${alpha})`;
        ctx!.fill();

        // Tail
        const tailGrad = ctx!.createLinearGradient(
          s.x, s.y,
          s.x - s.vx * s.tail, s.y - s.vy * s.tail
        );
        tailGrad.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.8})`);
        tailGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x - s.vx * s.tail, s.y - s.vy * s.tail);
        ctx!.strokeStyle = tailGrad;
        ctx!.lineWidth = 1.5 * alpha;
        ctx!.stroke();

        return true;
      });
    }

    resize();
    animFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-bg" aria-hidden="true" />;
}
