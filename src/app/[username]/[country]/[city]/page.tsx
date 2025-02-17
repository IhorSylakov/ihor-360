import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../index.module.css';
import { Place } from '@/types/types';

interface UserCityPage {
  params: Promise<{
    username: string;
    country: string;
    city: string;
  }>;
}

export default async function CityPage({ params }: UserCityPage ) {
  const { username, country, city } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}/${country}/${city}`);
  if (!res.ok) {
    return <div>Ошибка загрузки мест.</div>;
  }

  const data = await res.json();

  return (
    <div className="page">
      <div className="page-content">
        <h1>{data.info.name}</h1>
        <ul className={styles.List}>
          {data.places.map((place: Place) => (
            <li key={place.id}>
              <Link href={`/${username}/${country}/${city}/${place.name}`} className={styles.Link}>
                <Image
                  width={150}
                  height={75}
                  className={styles.Image}
                  alt={place.name}
                  src={place.imageUrl === '' ? data.info.imageUrl : place.imageUrl}
                />
                <span className={styles.LinkText}>{place.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        {data.info.description && (
          <div
            className={styles.Content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.info.description) }}
          />
        )}
      </div>
    </div>
  );
}
