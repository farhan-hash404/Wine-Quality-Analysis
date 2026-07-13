const TABS = [
  { id: 'overview', label: 'Overview', icon: OverviewIcon },
  { id: 'distribution', label: 'Distribution', icon: DistributionIcon },
  { id: 'correlation', label: 'Correlation', icon: CorrelationIcon },
  { id: 'reserve', label: 'Reserve List', icon: ReserveIcon },
  { id: 'predict', label: 'Predict', icon: PredictIcon },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'var(--sidebar-width)',
        background: 'var(--pomegranate)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '28px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 22V18C8 16.8954 8.89543 16 10 16H14C15.1046 16 16 16.8954 16 18V22" />
            <path d="M12 2C12 2 7 6 7 10C7 12.2091 8.79086 14 11 14H13C15.2091 14 17 12.2091 17 10C17 6 12 2 12 2Z" />
          </svg>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--beige)', textTransform: 'uppercase' }}>
            Vintage No. 1143
          </span>
        </div>
        <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginTop: '6px' }}>
          Wine Quality<br />Dashboard
        </h1>
      </div>

      <nav style={{ padding: '0 12px', flex: 1 }}>
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'rgba(216, 199, 181, 0.75)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon active={isActive} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(216, 199, 181, 0.5)' }}>
          Cellar Analysis
        </span>
      </div>
    </aside>
  );
}

function OverviewIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

function DistributionIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="3" height="5" rx="0.5" />
      <rect x="6.5" y="5" width="3" height="9" rx="0.5" />
      <rect x="11" y="2" width="3" height="12" rx="0.5" />
    </svg>
  );
}

function CorrelationIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="4" height="4" rx="0.5" />
      <rect x="10" y="2" width="4" height="4" rx="0.5" />
      <rect x="2" y="10" width="4" height="4" rx="0.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <line x1="6" y1="4" x2="10" y2="4" />
      <line x1="4" y1="6" x2="4" y2="10" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="6" y1="12" x2="10" y2="12" />
    </svg>
  );
}

function ReserveIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 14V12C5 10.8954 5.89543 10 7 10H9C10.1046 10 11 10.8954 11 12V14" />
      <path d="M8 2C8 2 5 5 5 7C5 8.65685 6.34315 10 8 10C9.65685 10 11 8.65685 11 7C11 5 8 2 8 2Z" />
    </svg>
  );
}

function PredictIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L4 8H12L10 2" />
      <line x1="4" y1="8" x2="3" y2="14" />
      <line x1="12" y1="8" x2="13" y2="14" />
      <line x1="3" y1="14" x2="13" y2="14" />
      <circle cx="8" cy="5" r="1" fill={active ? '#fff' : 'currentColor'} stroke="none" />
    </svg>
  );
}
