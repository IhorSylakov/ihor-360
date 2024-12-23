'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { media } from '@/data/countryData';

const preview = 'https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/';

export default function CityPage() {
  const params = useParams() as { username: string, country: string; city: string };

  const country = media.find((c) => c.name === params.country);
  const city = country?.cities.find((ct) => ct.name === params.city);

  if (!city) {
    notFound();
  }

  return (
    <div>
      <h1>{city.name} in {country?.name}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {city.places.map((place) => (
          <li key={place.id}>
            <Link href={`/${params.username}/${country?.name}/${city.name}/${place.id}`}>
              <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1', objectFit: 'cover' }}
                alt={`${place.name}`}
                src={place.preview ? place.preview : preview + place.photos[0].panorama}
              />
              {place.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
