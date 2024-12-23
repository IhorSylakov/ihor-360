'use client';

import Link from 'next/link';
import { media } from '@/data/countryData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserData } from '@/types/types';
import styles from './index.module.css'
import LogoutButton from '@/components/LogoutButton';
import { useIsUserAuthorized } from '@/hooks/useIsUserAuthorized';

export default function UserPage() {
  const { username } = useParams() as { username: string };
  const { isAuthorized, error, loading } = useIsUserAuthorized();
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
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setUserData(null);
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

  return (
    <div>
      <h1>Профиль пользователя: {username}</h1>
      {isAuthorized ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>{error}</p>
      )}

      <LogoutButton />

      <ul className={styles.List}>
        {media.map((country) => (
          <li key={country.name}>
            <Link
              href={`/${username}/${country.name}`}
              className={styles.Link}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
