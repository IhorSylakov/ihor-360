import Link from 'next/link';
// import Image from 'next/image';
import { fetchCities } from '@/lib/firebaseHelpers';
import { cookies } from 'next/headers';

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await params;
  const userCookies = await cookies();
  const userCookie = userCookies.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const cities = await fetchCities(country, user.uid);

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
            <Link href={`/${user.username}/${country}/${city.name}`}>
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
