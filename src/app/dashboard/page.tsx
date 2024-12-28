'use client';

import Link from 'next/link';
import styles from './index.module.css'
import { useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';

export default function Dashboard() {
  const { state, fetchCountries } = useLocation();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <h1>Все доступные страны</h1>
      <ul className={styles.List}>
        {state.countries.map((country) => (
          <li key={country.id}>
            <Link
              href={`/dashboard/${country.name}`}
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
