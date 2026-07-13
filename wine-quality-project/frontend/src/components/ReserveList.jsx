import { useEffect, useState } from 'react';
import { getHighQuality } from '../api';
import { Card, SectionEyebrow, SectionTitle, LoadingState, ErrorState } from './Card';

const DISPLAY_COLUMNS = [
  'fixed acidity',
  'volatile acidity',
  'citric acid',
  'alcohol',
  'sulphates',
  'quality',
];

export default function ReserveList() {
  const [threshold, setThreshold] = useState(7);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    getHighQuality(threshold).then(setData).catch((e) => setError(e.message));
  }, [threshold]);

  return (
    <div>
      <SectionEyebrow>The Short Pour</SectionEyebrow>
      <SectionTitle>Reserve List</SectionTitle>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <label htmlFor="threshold" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Minimum Quality
          </label>
          <input
            id="threshold"
            type="range"
            min={3}
            max={8}
            step={1}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              width: 180,
              height: 4,
              borderRadius: 2,
              background: 'var(--border)',
              outline: 'none',
              accentColor: 'var(--pomegranate)',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--pomegranate)' }}>{threshold}+</span>
        </div>

        {error && <ErrorState message={error} />}
        {!error && !data && <LoadingState label="Loading wines\u2026" />}

        {data && (
          <>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: 0, marginBottom: '16px' }}>
              {data.count} wine{data.count === 1 ? '' : 's'} scoring {threshold} or above.
            </p>
            <div style={{ overflowX: 'auto', maxHeight: 440, overflowY: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    {DISPLAY_COLUMNS.map((col) => (
                      <th
                        key={col}
                        style={{
                          textAlign: 'left',
                          padding: '10px 16px',
                          fontWeight: 600,
                          fontSize: '11px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: 'var(--text-tertiary)',
                          background: 'var(--bg)',
                          borderBottom: '1px solid var(--border)',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.wines.map((wine, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      {DISPLAY_COLUMNS.map((col) => (
                        <td
                          key={col}
                          style={{
                            padding: '10px 16px',
                            color: col === 'quality' ? 'var(--pomegranate)' : 'var(--text-secondary)',
                            fontWeight: col === 'quality' ? 600 : 400,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {wine[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {data.wines.length === 0 && (
                    <tr>
                      <td colSpan={DISPLAY_COLUMNS.length} style={{ padding: '24px 16px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                        No wines at this threshold.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
