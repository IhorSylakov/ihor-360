'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserData } from '@/types/types';
import { useParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import Storages from '@/components/Storages';

export default function SettingsPage() {
  const { username } = useParams() as { username: string };
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (userUid: string) => {
    if (!file) {
      setError('Выберите файл.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);
      console.log(jsonData);
      for (const country of jsonData) {
        const countryRef = await addDoc(collection(doc(db, 'users', userUid), 'countries'), {
          name: country.name,
          visitDate: country.visitDate,
        });

        for (const city of country.cities) {
          const cityRef = await addDoc(collection(countryRef, 'cities'), {
            name: city.name,
            imageUrl: city.imageUrl,
          });
  
          for (const place of city.places) {
            const placeRef = await addDoc(collection(cityRef, 'places'), {
              name: place.name,
              imageUrl: place.imageUrl,
            });
  
            for (const photo of place.photos) {
              await addDoc(collection(placeRef, 'photos'), {
                imageUrl: photo.imageUrl,
                previewUrl: photo.previewUrl,
                isPano: photo.isPano,
                isHidden: photo.isHidden,
                name: photo.name,
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Ошибка при обработке файла:', err);
      setError('Ошибка при обработке файла.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/backup?userId=${user?.uid}`);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных.');
      }

      const { countries } = await response.json();
      const blob = new Blob([JSON.stringify(countries, null, 2)], { type: 'application/json' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'countries-data.json';
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Ошибка при скачивании данных.');
    }
  };

  if (!user) return <p>You are not logged in!</p>;

  return (
    <div className="page">
      <div className="page-content">
        <h1>Settings</h1>
        <section>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </section>
        <section>
          <h2>Загрузить данные</h2>
          <input type="file" accept="application/json" onChange={handleFileChange} />
          <button onClick={() => handleUpload(user?.uid)} disabled={loading}>
            Загрузить
          </button>
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>Данные успешно загружены!</p>}
        </section>
        <section>
          <h2>Скачать данные</h2>
          <button onClick={handleDownload}>
            Скачать
          </button>
        </section>
        <section>
          <h2>Выбор хранилища</h2>
          <Storages />
        </section>
        <section></section>
      </div>
    </div>
  );
}
