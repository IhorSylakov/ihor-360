import Link from 'next/link';
import Image from 'next/image';
import styles from '../index.module.css';
import { City } from '@/types/types';

interface UserCountryPage {
  params: Promise<{
    username: string;
    country: string;
  }>;
}

export default async function CountryPage({ params }: UserCountryPage ) {
  const { username, country } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}/${country}`);
  if (!res.ok) {
    return <div>Ошибка загрузки городов.</div>;
  }

  const data = await res.json();

  return (
    <div>
      <h1>{data.info.name}</h1>
      <ul className={styles.List}>
        {data.cities.map((city: City) => (
          <li key={city.id}>
            <Link href={`/${username}/${country}/${city.name}`} className={styles.Link}>
              {city.imageUrl &&
                <Image
                  width={150}
                  height={75}
                  className={styles.Image}
                  alt={city.name}
                  src={city.imageUrl}
                />
              }
              <span className={styles.LinkText}>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <div dangerouslySetInnerHTML={{ __html: data.info.description }} /> */}
    </div>
  );
}
