'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { useUser } from '@/context/UserContext';

export default function CityPage() {
  const params = useParams() as { username: string, country: string; city: string };
  const { state, fetchCitiesAndPlaces } = useLocation();
  const { state: userState } = useUser();

  useEffect(() => {
    if (userState.uid) {
      fetchCitiesAndPlaces(params.country, params.city, userState.uid);
    }
  }, [fetchCitiesAndPlaces, userState]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <h1>{params.city} in {params.country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {state.places.map((place) => (
          <li key={place.id}>
            <Link href={`/${params.username}/${params.country}/${params.city}/${place.name}`}>
              {/* <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1', objectFit: 'cover' }}
                alt={`${place.name}`}
                src={place.preview ? place.preview : preview + place.photos[0].panorama}
              /> */}
              {place.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
