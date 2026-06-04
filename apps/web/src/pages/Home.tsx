import { NeonCard } from '@/components/NeonCard';
import { NameCRUD } from '@/components/NameCRUD';

export default function Home() {
  return (
    <div
      className="lumen-canvas"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'hsl(var(--background))',
      }}
    >
      {/* Ambient blob 1 — primary */}
      <div
        aria-hidden="true"
        className="ambient-blob blob-1"
        style={{
          position: 'absolute',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      {/* Ambient blob 2 — accent */}
      <div
        aria-hidden="true"
        className="ambient-blob blob-2"
        style={{
          position: 'absolute',
          width: 'clamp(250px, 45vw, 520px)',
          height: 'clamp(250px, 45vw, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--brand-accent) / 0.15) 0%, transparent 70%)',
          bottom: '-8%',
          right: '-8%',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      {/* Ambient blob 3 — primary mid */}
      <div
        aria-hidden="true"
        className="ambient-blob blob-3"
        style={{
          position: 'absolute',
          width: 'clamp(200px, 35vw, 400px)',
          height: 'clamp(200px, 35vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          top: '50%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      {/* Card stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <NeonCard />
        <NameCRUD />
      </div>

      {/* Footer watermark */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'hsl(var(--muted-foreground) / 0.3)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        LumenCard — Neon Glass Interface
      </p>
    </div>
  );
}
