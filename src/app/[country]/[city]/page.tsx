'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { data } from '@/data/countryData';

export default function CityPage() {
  const params = useParams() as { country: string; city: string };

  const country = data.find((c) => c.name === params.country);
  const city = country?.cities.find((ct) => ct.name === params.city);

  if (!city) {
    notFound();
  }

  return (
    <div>
      <h1>{city.name} in {country?.name}</h1>
      <ul style={{ display: 'grid', gap: '15px', listStyle: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))' }}>
        {city.places.map((place) => (
          <li key={place.id}>
            <Link href={`/${country?.name}/${city.name}/${place.id}`}>
              <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto' }}
                alt={`${place.photos[0].title}`}
                src={`https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/${place.photos[0].panorama}`}
              />
              {place.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
