import Link from 'next/link';
import { data } from '@/data/countryData';

export default function HomePage() {
  return (
    <div>
      <h1>Choose a Country</h1>
      <ul>
        {data.map((country) => (
          <li key={country.name}>
            <Link href={`/${country.name}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
