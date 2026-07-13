import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getQualityDistribution } from '../api';
import { Card, SectionEyebrow, SectionTitle, LoadingState, ErrorState } from './Card';

function colorForQuality(q) {
  if (q >= 7) return '#6B1F2A';
  if (q >= 5) return '#8B3A47';
  return '#D8C7B5';
}

export default function Distribution() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualityDistribution()
      .then((res) => {
        const rows = res.labels.map((label, i) => ({ quality: label, count: res.counts[i] }));
        setData(rows);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState label="Loading distribution\u2026" />;

  return (
    <div>
      <SectionEyebrow>Score Breakdown</SectionEyebrow>
      <SectionTitle>Quality Distribution</SectionTitle>

      <Card>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: -8, bottom: 8 }}>
            <XAxis
              dataKey="quality"
              tick={{ fill: '#6B5A60', fontFamily: 'Inter', fontSize: 12 }}
              axisLine={{ stroke: '#E8E2DC' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B5A60', fontFamily: 'Inter', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(107, 31, 42, 0.04)' }}
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E8E2DC',
                borderRadius: 12,
                fontFamily: 'Inter',
                fontSize: 13,
                color: '#2D1A1E',
                boxShadow: '0 4px 16px rgba(45, 26, 30, 0.08)',
              }}
              labelFormatter={(v) => `Quality ${v}`}
              formatter={(value) => [value, 'Samples']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((row) => (
                <Cell key={row.quality} fill={colorForQuality(Number(row.quality))} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: '12px' }}>
          Most samples score 5\u20136. Scores of 7+ represent genuinely distinctive wines.
        </p>
      </Card>
    </div>
  );
}
