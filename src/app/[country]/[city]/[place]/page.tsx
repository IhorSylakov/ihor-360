'use client';

import { useParams, notFound } from 'next/navigation';
import { data } from '@/data/countryData';
import Link from 'next/link';
import Image from 'next/image';

export default function PlacePage() {
  const params = useParams() as { country: string; city: string; place: string };

  const country = data.find((c) => c.name === params.country);
  const city = country?.cities.find((ct) => ct.name === params.city);
  const place = city?.places.find((pl) => pl.id === params.place);
  const photos = place!.photos.filter((photo) => !photo.hide);

  if (!place) {
    notFound();
  }

  return (
    <div>
      <h1>{place.name} in {city?.name}, {country?.name}</h1>
      <ul style={{ display: 'grid', gap: '15px', listStyle: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))' }}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/${country?.name}/${city?.name}/${place.id}/${photo.id}`}>
              <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto' }}
                alt={`${photo.title}`}
                src={`https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/${photo.panorama}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
