'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
// import Image from 'next/image';
import { useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';

export default function CountryPage() {
  const params = useParams() as { country: string };
  const { state, fetchCitiesAndPlaces } = useLocation();

  useEffect(() => {
    fetchCitiesAndPlaces(params.country);
  }, [fetchCitiesAndPlaces]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <h1>dashboard {params.country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {state.cities.map((city) => (
          <li key={city.name}>
            <Link href={`/dashboard/${params.country}/${city?.name}`}>
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
