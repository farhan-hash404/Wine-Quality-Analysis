import { useEffect, useState } from 'react';

export default function WineGlassGauge({ score, label }) {
  const [animatedFill, setAnimatedFill] = useState(0);

  const clamped = Math.max(0, Math.min(10, score ?? 0));
  const fillRatio = clamped / 10;

  useEffect(() => {
    const t = setTimeout(() => setAnimatedFill(fillRatio), 80);
    return () => clearTimeout(t);
  }, [fillRatio]);

  const bowlTop = 40;
  const bowlBottom = 185;
  const fillY = bowlBottom - animatedFill * (bowlBottom - bowlTop);

  const toneColor = clamped >= 7 ? '#6B1F2A' : clamped >= 5 ? '#8B3A47' : '#D8C7B5';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <svg viewBox="0 0 160 260" width="130" height="220" role="img" aria-label={`Predicted quality ${clamped} out of 10`}>
        <defs>
          <clipPath id="glassBowlClip">
            <path d="M 30 38 C 30 100 40 150 80 185 C 120 150 130 100 130 38 Z" />
          </clipPath>
          <linearGradient id="wineGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={toneColor} />
            <stop offset="100%" stopColor={toneColor} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <g clipPath="url(#glassBowlClip)">
          <rect
            x="20"
            y={fillY}
            width="120"
            height="260"
            fill="url(#wineGradient)"
            style={{ transition: 'y 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
          <rect
            x="20"
            y={fillY}
            width="120"
            height="2"
            fill="#FFFFFF"
            opacity="0.3"
            style={{ transition: 'y 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </g>

        <path
          d="M 30 38 C 30 100 40 150 80 185 C 120 150 130 100 130 38"
          fill="none"
          stroke="var(--beige)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="80" cy="38" rx="50" ry="9" fill="none" stroke="var(--beige)" strokeWidth="1.5" />
        <line x1="80" y1="185" x2="80" y2="235" stroke="var(--beige)" strokeWidth="1.5" />
        <ellipse cx="80" cy="242" rx="30" ry="6" fill="none" stroke="var(--beige)" strokeWidth="1.5" />
      </svg>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '36px', fontWeight: 700, color: toneColor, lineHeight: 1 }}>
          {clamped.toFixed(1)}
          <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: '2px' }}>/10</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginTop: '4px' }}>
          {label}
        </div>
      </div>
    </div>
  );
}
