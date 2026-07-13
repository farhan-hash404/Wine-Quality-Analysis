import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Distribution from './components/Distribution';
import Correlation from './components/Correlation';
import ReserveList from './components/ReserveList';
import Predict from './components/Predict';

export default function App() {
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={tab} onChange={setTab} />
      <main
        style={{
          flex: 1,
          marginLeft: 'var(--sidebar-width)',
          padding: '40px 48px 64px',
          maxWidth: 1120,
          animation: 'fadeIn 0.3s ease',
        }}
        key={tab}
      >
        {tab === 'overview' && <Overview />}
        {tab === 'distribution' && <Distribution />}
        {tab === 'correlation' && <Correlation />}
        {tab === 'reserve' && <ReserveList />}
        {tab === 'predict' && <Predict />}
      </main>
    </div>
  );
}
