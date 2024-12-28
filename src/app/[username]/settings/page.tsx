'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { media } from '@/data/countryData';
import { UserData } from '@/types/types';
import { useParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function SettingsPage() {
  const { username } = useParams() as { username: string };
  const { state } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      );
      const querySnapshot = await getDocs(q);

      try {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data() as UserData);
          setLoading(false);
        } else {
          setUserData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setUserData(null);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <>loading...</>
  }

  if (!userData) {
    return <>no data...</>
  }

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
      <br />
      <br />
      {state.username === username && (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
      <br />
      <br />
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
