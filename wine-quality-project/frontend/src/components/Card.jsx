export function Card({ children, style }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({ children }) {
  return (
    <div
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--pomegranate)',
        marginBottom: '8px',
      }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '24px',
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  );
}

export function LoadingState({ label = 'Loading\u2026' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'var(--text-tertiary)',
        fontSize: '13px',
        padding: '32px 0',
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          border: '2px solid var(--border)',
          borderTopColor: 'var(--pomegranate)',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
      {label}
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div
      style={{
        background: 'rgba(107, 31, 42, 0.04)',
        border: '1px solid rgba(107, 31, 42, 0.15)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        color: 'var(--pomegranate)',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      {message || 'Could not connect to the API. Is the backend running on port 8000?'}
    </div>
  );
}
