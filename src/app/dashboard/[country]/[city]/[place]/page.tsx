import Link from 'next/link';
import Image from 'next/image';
import { fetchPhotos } from '@/lib/firebaseHelpers';

interface PlacePageProps {
  params: Promise<{
    country: string;
    city: string;
    place: string;
  }>;
}
export default async function PlacePage({ params }: PlacePageProps) {
  const { country, city, place } = await params;
  const photos = await fetchPhotos(place);

  return (
    <div>
      <h1>{place} in {city}, {country}</h1>
      <ul
        style={{
          display: 'grid',
          gap: '15px',
          listStyle: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px ,1fr))'
        }}
      >
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/dashboard/${country}/${city}/${place}/${photo.id}`}>
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
