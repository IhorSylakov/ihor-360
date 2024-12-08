'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/data/countryData';

const preview = 'https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/';

export default function CountryPage() {
  const params = useParams() as { country: string };

  const country = media.find((c) => c.name === params.country);

  if (!country) {
    notFound();
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {country.cities.map((city) => (
          <li key={city.name}>
            <Link href={`/${country?.name}/${city?.name}`}>
              <Image
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1', objectFit: 'cover' }}
                alt={`${city.name}`}
                src={city.preview ? city.preview : preview + city.places[0].photos[0].panorama}
              />
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
