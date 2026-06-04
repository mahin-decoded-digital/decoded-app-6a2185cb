import '@/styles/theme.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from '@/pages/Home';

// Dark mode forced for this brand
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

const ANIMATIONS_CSS = `
@keyframes blob-drift-1 {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(4%, 3%) scale(1.06); }
  66%  { transform: translate(-3%, 5%) scale(0.96); }
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes blob-drift-2 {
  0%   { transform: translate(0, 0) scale(1); }
  40%  { transform: translate(-5%, -4%) scale(1.08); }
  70%  { transform: translate(3%, -6%) scale(0.94); }
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes blob-drift-3 {
  0%   { transform: translate(-50%, -50%) scale(1); }
  50%  { transform: translate(-50%, -50%) scale(1.12) rotate(15deg); }
  100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
}
.blob-1 { animation: blob-drift-1 14s ease-in-out infinite; }
.blob-2 { animation: blob-drift-2 18s ease-in-out infinite; }
.blob-3 { animation: blob-drift-3 22s ease-in-out infinite; }

@keyframes neon-pulse {
  0%   { box-shadow: 0 0 0 1px hsl(var(--primary) / 0.12) inset, 0 0 28px 3px hsl(var(--primary) / 0.22), 0 8px 40px 0 hsl(var(--background) / 0.6); }
  50%  { box-shadow: 0 0 0 1px hsl(var(--brand-accent) / 0.15) inset, 0 0 38px 6px hsl(var(--primary) / 0.32), 0 0 18px 2px hsl(var(--brand-accent) / 0.18), 0 8px 40px 0 hsl(var(--background) / 0.6); }
  100% { box-shadow: 0 0 0 1px hsl(var(--primary) / 0.12) inset, 0 0 28px 3px hsl(var(--primary) / 0.22), 0 8px 40px 0 hsl(var(--background) / 0.6); }
}
.neon-card { animation: neon-pulse 2s ease-in-out infinite; }

.neon-border-pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 1px solid transparent;
  background: linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, hsl(var(--brand-accent) / 0.15) 50%, hsl(var(--primary) / 0.2) 100%) border-box;
  -webkit-mask: linear-gradient(hsl(var(--background)) 0 0) padding-box, linear-gradient(hsl(var(--background)) 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  animation: border-glow-shift 3s ease-in-out infinite;
}
@keyframes border-glow-shift {
  0%   { opacity: 0.6; }
  50%  { opacity: 1; }
  100% { opacity: 0.6; }
}

.neon-action-btn:active {
  box-shadow: 0 0 24px 4px hsl(var(--brand-accent) / 0.45) !important;
  border-color: hsl(var(--brand-accent) / 0.7) !important;
}

@media (prefers-reduced-motion: reduce) {
  .blob-1, .blob-2, .blob-3 { animation: none !important; }
  .neon-card { animation: none !important; }
  .neon-border-pulse { animation: none !important; }
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
`;

function GlobalAnimations() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'lumencard-animations';
    style.textContent = ANIMATIONS_CSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('lumencard-animations');
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <GlobalAnimations />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'hsl(var(--background))',
                fontFamily: 'var(--font-display)',
                color: 'hsl(var(--foreground))',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontSize: '5rem',
                  fontWeight: 700,
                  color: 'hsl(var(--primary))',
                  textShadow: '0 0 30px hsl(var(--primary) / 0.6)',
                }}
              >
                404
              </span>
              <p style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
                Nothing glowing here. Lost in the dark.
              </p>
              <a
                href="/"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.6rem 1.6rem',
                  borderRadius: '0.75rem',
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
                }}
              >
                Back to the Light
              </a>
            </div>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
