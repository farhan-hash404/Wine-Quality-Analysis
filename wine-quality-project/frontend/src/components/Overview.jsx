import { useEffect, useState } from 'react';
import { getSummary } from '../api';
import { Card, SectionEyebrow, SectionTitle, LoadingState, ErrorState } from './Card';

const STAT_CARDS = [
  { key: 'quality', label: 'Avg Quality', unit: '/10', decimals: 2 },
  { key: 'alcohol', label: 'Avg Alcohol', unit: '% vol', decimals: 2 },
  { key: 'pH', label: 'Avg pH', unit: '', decimals: 2 },
  { key: 'residual sugar', label: 'Avg Residual Sugar', unit: 'g/L', decimals: 2 },
];

export default function Overview() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSummary().then(setSummary).catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!summary) return <LoadingState />;

  const stats = summary.statistics;

  return (
    <div>
      <SectionEyebrow>Dataset at a Glance</SectionEyebrow>
      <SectionTitle>Overview</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Samples
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
            {summary.row_count.toLocaleString()}
          </div>
        </Card>

        {STAT_CARDS.map(({ key, label, unit, decimals }) => {
          const mean = stats[key]?.mean;
          return (
            <Card key={key}>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                {label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                {mean != null ? mean.toFixed(decimals) : '\u2014'}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: '4px' }}>{unit}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
          Full Feature Statistics
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>Mean</th>
                <th style={thStyle}>Std</th>
                <th style={thStyle}>Min</th>
                <th style={thStyle}>Max</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats)
                .filter(([key]) => key !== 'Id')
                .map(([key, s]) => (
                  <tr key={key} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--text-primary)' }}>{key}</td>
                    <td style={tdStyle}>{s.mean?.toFixed(3)}</td>
                    <td style={tdStyle}>{s.std?.toFixed(3)}</td>
                    <td style={tdStyle}>{s.min?.toFixed(3)}</td>
                    <td style={tdStyle}>{s.max?.toFixed(3)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 16px',
  color: 'var(--text-tertiary)',
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const tdStyle = {
  padding: '10px 16px',
  color: 'var(--text-secondary)',
  fontVariantNumeric: 'tabular-nums',
};
