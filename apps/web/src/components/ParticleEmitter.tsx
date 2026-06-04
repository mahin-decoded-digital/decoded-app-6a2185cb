import { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: string;
  life: number;
  maxLife: number;
}

interface ParticleEmitterProps {
  trigger: number;
  originX: number;
  originY: number;
}

export function ParticleEmitter({ trigger, originX, originY }: ParticleEmitterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const counterRef = useRef(0);

  useEffect(() => {
    if (trigger === 0) return;

    const count = 20 + Math.floor(Math.random() * 10);
    const newParticles: Particle[] = [];

    // Resolve brand CSS variables to actual colour strings for canvas use
    const style = getComputedStyle(document.documentElement);
    const primary = `hsl(${style.getPropertyValue('--primary').trim()})`;
    const accent = `hsl(${style.getPropertyValue('--brand-accent').trim()})`;
    const hues = [primary, primary, accent, accent, primary, accent];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4.5;
      newParticles.push({
        id: counterRef.current++,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        hue: hues[Math.floor(Math.random() * hues.length)],
        life: 0,
        maxLife: 50 + Math.floor(Math.random() * 30),
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
  }, [trigger, originX, originY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        const progress = p.life / p.maxLife;
        const opacity = 1 - progress;
        const eased = 1 - Math.pow(progress, 2);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.hue;
        ctx.shadowColor = p.hue;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(
          p.x + p.vx * p.life * eased,
          p.y + p.vy * p.life * eased,
          p.size * (1 - progress * 0.5),
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();

        p.life++;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
