import Link from 'next/link';
// import Image from 'next/image';
import { fetchCities } from '@/lib/firebaseHelpers';

interface CountryPageProps {
  params: Promise<{
    username: string;
    country: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { username, country } = await params;
  const cities = await fetchCities(country, username);

  return (
    <div>
      <h1>{country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {cities.map((city) => (
          <li key={city.name}>
            <Link href={`/${username}/${country}/${city.name}`}>
              {/* <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1', objectFit: 'cover' }}
                alt={`${city.name}`}
                src={city.preview}
              /> */}
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
