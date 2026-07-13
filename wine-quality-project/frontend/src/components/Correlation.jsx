import { useEffect, useState } from 'react';
import { getCorrelation } from '../api';
import { Card, SectionEyebrow, SectionTitle, LoadingState, ErrorState } from './Card';

function cellColor(value) {
  const v = Math.max(-1, Math.min(1, value));
  if (v >= 0) {
    const alpha = v;
    return `rgba(107, 31, 42, ${0.04 + alpha * 0.55})`;
  }
  const alpha = -v;
  return `rgba(216, 199, 181, ${0.2 + alpha * 0.6})`;
}

export default function Correlation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    getCorrelation().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState label="Computing correlations\u2026" />;

  const { columns, matrix } = data;
  const short = (name) => (name.length > 10 ? name.slice(0, 4) + '\u2026' : name);

  return (
    <div>
      <SectionEyebrow>Feature Relationships</SectionEyebrow>
      <SectionTitle>Correlation Matrix</SectionTitle>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: `130px repeat(${columns.length}, 44px)`, gap: 3 }}>
            <div />
            {columns.map((c) => (
              <div
                key={c}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'var(--text-tertiary)',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  height: 90,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: 6,
                }}
                title={c}
              >
                {short(c)}
              </div>
            ))}

            {matrix.map((row, i) => (
              <div key={columns[i]} style={{ display: 'contents' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: 10,
                  }}
                  title={columns[i]}
                >
                  {columns[i]}
                </div>
                {row.map((value, j) => (
                  <div
                    key={`${i}-${j}`}
                    onMouseEnter={() => setHovered({ row: columns[i], col: columns[j], value })}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: 44,
                      height: 44,
                      background: cellColor(value),
                      border: '1px solid rgba(232, 226, 220, 0.5)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      transition: 'transform 0.1s ease',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(45, 26, 30, 0.65)' }}>
                      {value.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            minHeight: '20px',
          }}
        >
          {hovered
            ? `${hovered.row} \u00d7 ${hovered.col} = ${hovered.value.toFixed(3)}`
            : 'Hover a cell for the exact correlation coefficient.'}
        </div>
      </Card>
    </div>
  );
}
