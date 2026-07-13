const BASE_URL = 'http://127.0.0.1:8000';

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json();
}

export function getSummary() {
  return request('/summary');
}

export function getQualityDistribution() {
  return request('/quality-distribution');
}

export function getCorrelation() {
  return request('/correlation');
}

export function getHighQuality(threshold = 7) {
  return request(`/high-quality?threshold=${threshold}`);
}

export function getFeatureRanges() {
  return request('/feature-ranges');
}

export function predictQuality(payload) {
  return request('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
