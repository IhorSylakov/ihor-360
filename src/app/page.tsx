import Link from 'next/link';
import { media, stories } from '@/data/countryData';
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      <section>
        <h1>Media by Country</h1>
        <ul className={styles.List}>
          {media.map((country) => (
            <li key={country.name}>
              <Link
                href={`/${country.name}`}
                className={styles.Link}
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>Stories</h1>
        <ul className={styles.List}>
          {stories.map((country) => (
            <li key={country.name}>
              <Link
                href={`/${country.name}`}
                className={styles.Link}
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
