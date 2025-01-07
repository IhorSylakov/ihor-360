import PhotoViewer from '@/components/PhotoViewer';

interface UserPlacePage {
  params: Promise<{
    username: string;
    country: string;
    city: string;
    place: string;
  }>;
}

export default async function PlacePage({ params }: UserPlacePage ) {
  const { username, country, city, place } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}/${country}/${city}/${place}`);
  if (!res.ok) {
    return <div>Ошибка загрузки мест.</div>;
  }

  const data = await res.json();

  return (
    <div>
      <h1>{place} in {city}, {country}</h1>
      <PhotoViewer
        imageUrl={data.photos[0].imageUrl}
        imagesList={data.photos}
        containerHeight='400px'
      />
      <h2>{data.info.description}</h2>
    </div>
  );
}
