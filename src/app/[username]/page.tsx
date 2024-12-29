import Link from 'next/link';
import styles from './index.module.css';
import { fetchCountries } from '@/lib/firebaseHelpers';

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;

  const countries = await fetchCountries(username);

  // Проверяем, является ли текущий пользователь владельцем страницы
  // Предполагаем, что текущий пользователь доступен из куков или сессии
  // const isOwner = true; // Здесь добавьте свою логику проверки, например, через авторизацию

  return (
    <div>
      <h1>Профиль пользователя: {username}</h1>

      {/* {isOwner && (
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
      )} */}

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
