import Link from 'next/link';
import styles from './index.module.css';
import { CSSProperties } from 'react';

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}`);
  if (!res.ok) {
    return <div>Ошибка загрузки стран.</div>;
  }

  const { countries } = await res.json();

  return (
    <div className="page">
      <div className="page-content">
        {/* <h1>Страны пользователя {username}</h1> */}
        <ul
          className={styles.List}
          style={{ "--list-item-width": "200px" } as CSSProperties}
        >
          {countries.map((country: { id: string; name: string }) => (
            <li key={country.id}>
              <Link href={`/${username}/${country.name}`} className={styles.Link}>
                <span className={styles.LinkText}>{country.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
