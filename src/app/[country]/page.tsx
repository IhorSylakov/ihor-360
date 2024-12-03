'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { data } from '@/data/countryData';

export default function CountryPage() {
  const params = useParams() as { country: string };

  const country = data.find((c) => c.name === params.country);

  if (!country) {
    notFound();
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <ul>
        {country.cities.map((city) => (
          <li key={city.name}>
            <Link href={`/${country.name}/${city.name}`}>{city.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
