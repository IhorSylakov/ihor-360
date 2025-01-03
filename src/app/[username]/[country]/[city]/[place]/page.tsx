import PhotoViewer from '@/components/PhotoViewer';
import { fetchPhotos } from '@/lib/firebaseHelpers';

interface PlacePageProps {
  params: Promise<{
    username: string;
    country: string;
    city: string;
    place: string;
  }>;
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { username, country, city, place } = await params;
  const photos = await fetchPhotos(place, username);

  return (
    <div>
      <h1>{place} in {city}, {country}</h1>
      <PhotoViewer
        imageUrl={photos[0].panorama}
        imagesList={photos}
        containerHeight='400px'
      />
    </div>
  );
}
