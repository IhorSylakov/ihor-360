'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './index.module.css'
import { useFetchLocation } from '@/hooks/useFetchLocation';
import { useIsUserAuthorized } from '@/hooks/useIsUserAuthorized';

export default function UserPage() {
  const { username } = useParams() as { username: string };
  const { isAuthorized } = useIsUserAuthorized();
  const {countries} = useFetchLocation('', '');

  return (
    <div>
      <h1>Профиль пользователя: {username}</h1>

      {isAuthorized && (
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
        {countries.map((country) => (
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
