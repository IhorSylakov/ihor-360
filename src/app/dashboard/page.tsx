import Link from 'next/link';
import styles from './index.module.css';
import { fetchCountries } from '@/lib/firebaseHelpers';

export default async function Dashboard() {
  const countries = await fetchCountries();

  return (
    <div>
      <h1>Все доступные страны</h1>
      <ul className={styles.List}>
        {countries.map((country) => (
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
