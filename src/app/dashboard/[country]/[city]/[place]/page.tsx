'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLocation } from '@/context/LocationContext';
import { useEffect } from 'react';

export default function PlacePage() {
  const params = useParams() as { username: string, country: string; city: string; place: string };
  const { state, fetchPhotos } = useLocation();

  useEffect(() => {
    fetchPhotos(params.country, params.city, params.place);
  }, [fetchPhotos]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <h1>{params.place} in {params.city}, {params.country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {state.photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/dashboard/${params.country}/${params.city}/${params.place}/${photo.id}`}>
              <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto' }}
                alt={`${photo.title}`}
                src={photo.thumbnail ? photo.thumbnail : ''}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
