'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './index.module.css'
import { useUser } from '@/context/UserContext';
import { useLocation } from '@/context/LocationContext';
import { useEffect } from 'react';

export default function UserPage() {
  const { username } = useParams() as { username: string };
  const { state, fetchCountries } = useLocation();
  const { state: userState } = useUser();

  useEffect(() => {
    fetchCountries(username);
  }, [fetchCountries]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <h1>Профиль пользователя: {username}</h1>

      {userState.username == username && (
        <div>
          <Link
            href={`/${username}/add-photo`}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'lightgreen',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            add-photo
          </Link>
        </div>
      )}

      <ul className={styles.List}>
        {state.countries.map((country) => (
          <li key={country.id}>
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
