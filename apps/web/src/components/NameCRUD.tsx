import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface NameEntry {
  id: string;
  name: string;
}

export function NameCRUD() {
  const [names, setNames] = useState<NameEntry[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error('Please enter a name first.');
      return;
    }
    const entry: NameEntry = { id: crypto.randomUUID(), name: trimmed };
    setNames((prev) => [entry, ...prev]);
    setInput('');
    inputRef.current?.focus();
    toast.success(`"${trimmed}" added!`);
  }, [input]);

  const handleDelete = useCallback((id: string, name: string) => {
    setNames((prev) => prev.filter((n) => n.id !== id));
    toast(`"${name}" removed.`);
  }, []);

  const handleStartEdit = useCallback((entry: NameEntry) => {
    setEditingId(entry.id);
    setEditValue(entry.name);
    setTimeout(() => editInputRef.current?.focus(), 50);
  }, []);

  const handleSaveEdit = useCallback(
    (id: string) => {
      const trimmed = editValue.trim();
      if (!trimmed) {
        toast.error('Name cannot be empty.');
        return;
      }
      setNames((prev) => prev.map((n) => (n.id === id ? { ...n, name: trimmed } : n)));
      setEditingId(null);
      setEditValue('');
      toast.success('Name updated!');
    },
    [editValue],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue('');
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleAdd();
    },
    [handleAdd],
  );

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      if (e.key === 'Enter') handleSaveEdit(id);
      if (e.key === 'Escape') handleCancelEdit();
    },
    [handleSaveEdit, handleCancelEdit],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow:
          '0 0 0 1.5px hsl(var(--brand-accent) / 0.45), 0 0 36px 4px hsl(var(--brand-accent) / 0.22), 0 0 70px 8px hsl(var(--primary) / 0.14), 0 16px 60px 0 rgba(0,0,0,0.5)',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url(https://decoded-studios-storage.s3.ap-southeast-2.amazonaws.com/public/pink-flower-2385703_1280-208e1d0a.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(10,0,25,0.52) 0%, rgba(5,0,18,0.68) 100%)',
          zIndex: 1,
        }}
      />
      {/* Frosted glass */}
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
      {/* Neon border shimmer */}
      <div
        aria-hidden="true"
        className="neon-border-pulse"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(135deg, hsl(var(--brand-accent) / 0.30) 0%, hsl(var(--primary) / 0.18) 50%, hsl(var(--brand-accent) / 0.25) 100%) border-box',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 4, padding: '2rem 1.75rem' }}>
        {/* Header */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'hsl(var(--brand-accent) / 0.85)',
            marginBottom: '0.5rem',
          }}
        >
          Name Registry
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
            fontWeight: 700,
            color: 'hsl(var(--foreground))',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          Add{' '}
          <span
            style={{
              color: 'hsl(var(--brand-accent))',
              textShadow:
                '0 0 14px hsl(var(--brand-accent) / 0.8), 0 0 36px hsl(var(--brand-accent) / 0.4)',
            }}
          >
            Names
          </span>
        </h2>

        {/* Input row */}
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            marginBottom: '1.5rem',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name…"
            maxLength={60}
            aria-label="Name input"
            style={{
              flex: 1,
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              padding: '0.65rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid hsl(var(--brand-accent) / 0.35)',
              background: 'hsl(var(--card) / 0.18)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'hsl(var(--foreground))',
              outline: 'none',
              transition: 'border-color 180ms ease, box-shadow 180ms ease',
              boxShadow: '0 0 8px hsl(var(--brand-accent) / 0.10)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--brand-accent) / 0.75)';
              e.currentTarget.style.boxShadow = '0 0 16px 2px hsl(var(--brand-accent) / 0.30)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--brand-accent) / 0.35)';
              e.currentTarget.style.boxShadow = '0 0 8px hsl(var(--brand-accent) / 0.10)';
            }}
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            onClick={handleAdd}
            aria-label="Add name"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '0.65rem 1.2rem',
              borderRadius: '0.75rem',
              border: '1px solid hsl(var(--brand-accent) / 0.55)',
              background: 'hsl(var(--brand-accent) / 0.18)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'hsl(var(--brand-accent))',
              cursor: 'pointer',
              transition: 'box-shadow 180ms ease, border-color 180ms ease',
              boxShadow: '0 0 14px 2px hsl(var(--brand-accent) / 0.22)',
              flexShrink: 0,
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px 4px hsl(var(--brand-accent) / 0.45)';
              e.currentTarget.style.borderColor = 'hsl(var(--brand-accent) / 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 14px 2px hsl(var(--brand-accent) / 0.22)';
              e.currentTarget.style.borderColor = 'hsl(var(--brand-accent) / 0.55)';
            }}
          >
            + Add
          </motion.button>
        </div>

        {/* Name count */}
        {names.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'hsl(var(--muted-foreground) / 0.7)',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
            }}
          >
            {names.length} {names.length === 1 ? 'name' : 'names'} registered
          </p>
        )}

        {/* Name list */}
        <div
          role="list"
          aria-label="Name list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '280px',
            overflowY: 'auto',
            paddingRight: '2px',
          }}
        >
          <AnimatePresence initial={false}>
            {names.map((entry) => (
              <motion.div
                key={entry.id}
                role="listitem"
                initial={{ opacity: 0, x: -16, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.94 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 0.9rem',
                  borderRadius: '0.65rem',
                  border: '1px solid hsl(var(--primary) / 0.28)',
                  background: 'hsl(var(--card) / 0.16)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 0 8px hsl(var(--primary) / 0.10)',
                }}
              >
                {/* Neon dot */}
                <span
                  aria-hidden="true"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'hsl(var(--primary))',
                    boxShadow: '0 0 8px 2px hsl(var(--primary) / 0.70)',
                    flexShrink: 0,
                  }}
                />

                {editingId === entry.id ? (
                  <>
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, entry.id)}
                      maxLength={60}
                      aria-label="Edit name"
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '0.4rem',
                        border: '1px solid hsl(var(--primary) / 0.5)',
                        background: 'hsl(var(--card) / 0.25)',
                        color: 'hsl(var(--foreground))',
                        outline: 'none',
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSaveEdit(entry.id)}
                      aria-label="Save edit"
                      title="Save"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '0.45rem',
                        border: '1px solid hsl(var(--primary) / 0.5)',
                        background: 'hsl(var(--primary) / 0.18)',
                        color: 'hsl(var(--primary))',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCancelEdit}
                      aria-label="Cancel edit"
                      title="Cancel"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '0.45rem',
                        border: '1px solid hsl(var(--muted-foreground) / 0.25)',
                        background: 'transparent',
                        color: 'hsl(var(--muted-foreground))',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </motion.button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        color: 'hsl(var(--foreground))',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {entry.name}
                    </span>
                    {/* Edit button */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.12 }}
                      onClick={() => handleStartEdit(entry)}
                      aria-label={`Edit ${entry.name}`}
                      title="Edit"
                      style={{
                        padding: '0.28rem 0.55rem',
                        borderRadius: '0.45rem',
                        border: '1px solid hsl(var(--primary) / 0.28)',
                        background: 'transparent',
                        color: 'hsl(var(--primary) / 0.7)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        lineHeight: 1,
                        flexShrink: 0,
                        transition: 'color 160ms, border-color 160ms, box-shadow 160ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--primary))';
                        e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 8px hsl(var(--primary) / 0.30)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--primary) / 0.7)';
                        e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.28)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      ✎
                    </motion.button>
                    {/* Delete button */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.12 }}
                      onClick={() => handleDelete(entry.id, entry.name)}
                      aria-label={`Delete ${entry.name}`}
                      title="Delete"
                      style={{
                        padding: '0.28rem 0.55rem',
                        borderRadius: '0.45rem',
                        border: '1px solid hsl(var(--destructive) / 0.30)',
                        background: 'transparent',
                        color: 'hsl(var(--destructive) / 0.65)',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        lineHeight: 1,
                        flexShrink: 0,
                        transition: 'color 160ms, border-color 160ms, box-shadow 160ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--destructive))';
                        e.currentTarget.style.borderColor = 'hsl(var(--destructive) / 0.7)';
                        e.currentTarget.style.boxShadow =
                          '0 0 8px hsl(var(--destructive) / 0.30)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--destructive) / 0.65)';
                        e.currentTarget.style.borderColor = 'hsl(var(--destructive) / 0.30)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      ✕
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {names.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                textAlign: 'center',
                padding: '1.8rem 1rem',
                borderRadius: '0.75rem',
                border: '1px dashed hsl(var(--brand-accent) / 0.20)',
                background: 'hsl(var(--card) / 0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  filter: 'drop-shadow(0 0 10px hsl(var(--brand-accent) / 0.5))',
                }}
                aria-hidden="true"
              >
                ✨
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'hsl(var(--muted-foreground) / 0.7)',
                  lineHeight: 1.5,
                }}
              >
                No names yet. Add one above{' '}
                <span
                  style={{
                    color: 'hsl(var(--brand-accent) / 0.8)',
                    textShadow: '0 0 8px hsl(var(--brand-accent) / 0.4)',
                  }}
                >
                  and watch it glow.
                </span>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
