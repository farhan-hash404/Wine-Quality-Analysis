import { useState, useEffect } from 'react';
import { predictQuality, getFeatureRanges } from '../api';
import { Card, SectionEyebrow, SectionTitle, LoadingState, ErrorState } from './Card';
import WineGlassGauge from './WineGlassGauge';

const FIELDS = [
  { key: 'fixed_acidity', label: 'Fixed Acidity', unit: 'g/L', default: 7.4, step: 0.1 },
  { key: 'volatile_acidity', label: 'Volatile Acidity', unit: 'g/L', default: 0.7, step: 0.01 },
  { key: 'citric_acid', label: 'Citric Acid', unit: 'g/L', default: 0.0, step: 0.01 },
  { key: 'residual_sugar', label: 'Residual Sugar', unit: 'g/L', default: 1.9, step: 0.1 },
  { key: 'chlorides', label: 'Chlorides', unit: 'g/L', default: 0.076, step: 0.001 },
  { key: 'free_sulfur_dioxide', label: 'Free Sulfur Dioxide', unit: 'mg/L', default: 11, step: 1 },
  { key: 'total_sulfur_dioxide', label: 'Total Sulfur Dioxide', unit: 'mg/L', default: 34, step: 1 },
  { key: 'density', label: 'Density', unit: 'g/mL', default: 0.9978, step: 0.0001 },
  { key: 'pH', label: 'pH', unit: '', default: 3.51, step: 0.01 },
  { key: 'sulphates', label: 'Sulphates', unit: 'g/L', default: 0.56, step: 0.01 },
  { key: 'alcohol', label: 'Alcohol', unit: '% vol', default: 9.4, step: 0.1 },
];

export default function Predict() {
  const [ranges, setRanges] = useState(null);
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map((f) => [f.key, f.default]))
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeatureRanges()
      .then((res) => {
        setRanges(res.ranges);
        const defaults = {};
        for (const f of FIELDS) {
          const r = res.ranges[f.key];
          defaults[f.key] = r ? Math.round(((r.min + r.max) / 2) * 100) / 100 : f.default;
        }
        setValues(defaults);
      })
      .catch(() => {});
  }, []);

  const handleChange = (key, raw) => {
    setValues((v) => ({ ...v, [key]: raw === '' ? '' : Number(raw) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, Number(v)])
      );
      const res = await predictQuality(payload);
      setResult(res);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getFieldRange = (key) => {
    if (!ranges || !ranges[key]) return { min: 0, max: 10 };
    return { min: ranges[key].min, max: ranges[key].max };
  };

  return (
    <div>
      <SectionEyebrow>Blend Your Own Sample</SectionEyebrow>
      <SectionTitle>Predict Quality</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {FIELDS.map((f) => {
                const { min, max } = getFieldRange(f.key);
                return (
                  <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-tertiary)' }}>
                        {f.label} {f.unit && <span style={{ fontSize: '11px', color: 'var(--beige-dark)' }}>({f.unit})</span>}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pomegranate)', fontVariantNumeric: 'tabular-nums' }}>
                        {typeof values[f.key] === 'number' ? values[f.key] : '\u2014'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={f.step}
                      value={values[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        background: 'var(--border)',
                        outline: 'none',
                        accentColor: 'var(--pomegranate)',
                      }}
                    />
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '24px',
                background: 'var(--pomegranate)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--pomegranate-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--pomegranate)'; }}
            >
              {loading ? 'Predicting\u2026' : 'Predict Quality'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '16px' }}>
              <ErrorState message={error} />
            </div>
          )}
        </Card>

        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 380, justifyContent: 'center' }}>
          {result ? (
            <WineGlassGauge score={result.predicted_quality} label={result.quality_label} />
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', textAlign: 'center', lineHeight: 1.6 }}>
              Adjust the sliders and<br />click Predict to see results.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
