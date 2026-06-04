import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleEmitter } from './ParticleEmitter';

export function NeonCard() {
  const [waving, setWaving] = useState(false);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [particleOrigin, setParticleOrigin] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;

    setParticleOrigin({ x, y });
    setParticleTrigger((t) => t + 1);
    setIsPressed(true);

    if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
    setWaving(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWaving(true);
        waveTimeoutRef.current = setTimeout(() => {
          setWaving(false);
          setIsPressed(false);
        }, 600);
      });
    });
  }, []);

  return (
    <>
      <ParticleEmitter
        trigger={particleTrigger}
        originX={particleOrigin.x}
        originY={particleOrigin.y}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        style={{
          position: 'relative',
          borderRadius: '1.5rem',
          padding: '0',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          overflow: 'hidden',
          boxShadow:
            '0 0 0 1.5px hsl(var(--primary) / 0.55), 0 0 40px 6px hsl(var(--primary) / 0.30), 0 0 80px 12px hsl(var(--brand-accent) / 0.18), 0 16px 60px 0 rgba(0,0,0,0.55)',
        }}
        className="neon-card"
      >
        {/* Flower photo background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://decoded-studios-storage.s3.ap-southeast-2.amazonaws.com/public/pink-flower-2385703_1280-208e1d0a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Dark overlay for readability */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(10,0,20,0.48) 0%, rgba(5,0,15,0.62) 100%)',
            zIndex: 1,
          }}
        />

        {/* Frosted glass layer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            zIndex: 2,
          }}
        />

        {/* Pulsing neon border overlay */}
        <div className="neon-border-pulse" aria-hidden="true" style={{ zIndex: 3 }} />

        {/* Card content */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            padding: '2.5rem 2rem',
          }}
        >
          {/* Section label */}
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'hsl(var(--primary) / 0.75)',
            }}
          >
            Interactive Canvas
          </p>

          {/* Main heading */}
          <h1
            className="mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
              fontWeight: 700,
              color: 'hsl(var(--foreground))',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Hello,{' '}
            <span
              style={{
                color: 'hsl(var(--primary))',
                textShadow:
                  '0 0 16px hsl(var(--primary) / 0.85), 0 0 40px hsl(var(--primary) / 0.45)',
              }}
            >
              World!
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.6,
            }}
          >
            Tap the button. Let the neon ignite.
          </p>

          {/* Emoji */}
          <div className="flex justify-center mb-8" style={{ minHeight: '72px', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              {waving ? (
                <motion.span
                  key="waving"
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{ scale: [1, 1.4, 1.2, 1.35, 1.0], rotate: [0, 15, -10, 12, 0] }}
                  exit={{ scale: 1, rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{ fontSize: '3.5rem', display: 'block', cursor: 'default' }}
                  aria-label="Waving hand"
                  role="img"
                >
                  👋
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '3.5rem', display: 'block', cursor: 'default' }}
                  aria-label="Hand emoji"
                  role="img"
                >
                  ✋
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Action button */}
          <motion.button
            ref={buttonRef}
            onClick={handleWave}
            animate={isPressed ? { scale: 1.08 } : { scale: 1 }}
            transition={isPressed ? { duration: 0.12 } : { duration: 0.2 }}
            whileHover={{ scale: isPressed ? 1.08 : 1.05 }}
            className="neon-action-btn"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.03em',
              padding: '0.8rem 2.4rem',
              borderRadius: '0.9rem',
              border: '1px solid hsl(var(--primary) / 0.45)',
              background: 'hsl(var(--card) / 0.22)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: 'hsl(var(--foreground))',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 180ms ease, box-shadow 180ms ease',
              boxShadow: '0 0 12px 1px hsl(var(--primary) / 0.20)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'hsl(var(--brand-accent) / 0.8)';
              el.style.boxShadow =
                '0 0 22px 4px hsl(var(--brand-accent) / 0.40), 0 0 8px 1px hsl(var(--primary) / 0.25)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'hsl(var(--primary) / 0.45)';
              el.style.boxShadow = '0 0 12px 1px hsl(var(--primary) / 0.20)';
            }}
            aria-label="Tap to wave"
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Tap to Wave</span>
          </motion.button>

          {/* Wave count hint */}
          {particleTrigger > 0 && (
            <motion.p
              key={particleTrigger}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                marginTop: '1.2rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-body)',
                color: 'hsl(var(--brand-accent))',
                textShadow: '0 0 12px hsl(var(--brand-accent) / 0.5)',
                letterSpacing: '0.06em',
              }}
            >
              {particleTrigger === 1
                ? 'Electric. Do it again.'
                : particleTrigger < 5
                ? `${particleTrigger}× charged ⚡`
                : 'Maximum luminosity reached 🌟'}
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  );
}
