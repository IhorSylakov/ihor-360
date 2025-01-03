import { fetchPlaces } from '@/lib/firebaseHelpers';
import Link from 'next/link';
// import Image from 'next/image';

interface CityPageProps {
  params: Promise<{
    username: string;
    country: string;
    city: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { username, city, country } = await params;
  const places = await fetchPlaces(city, username);

  return (
    <div>
      <h1>{city} in {country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {places.map((place) => (
          <li key={place.id}>
            <Link href={`/${username}/${country}/${city}/${place.name}`}>
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
