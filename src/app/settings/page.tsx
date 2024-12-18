'use client';

import { media } from '@/data/countryData';

export default function SettingsPage() {
  const handleExport = () => {
    const jsonString = JSON.stringify(media, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'countryData.json';

    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={handleExport}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Export data
      </button>
    </div>
  );
}
