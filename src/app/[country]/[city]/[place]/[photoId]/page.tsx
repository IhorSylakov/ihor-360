'use client';

import { useParams, notFound } from 'next/navigation';
import { data } from '@/data/countryData';
import PhotoViewer from '@/components/PhotoViewer';

export default function PhotoViewerPage() {
  const params = useParams() as { country: string; city: string; place: string; photoId: string };

  const country = data.find((c) => c.name === params.country);
  const city = country?.cities.find((ct) => ct.name === params.city);
  const place = city?.places.find((pl) => pl.id === params.place);
  const photos = place!.photos.filter((photo) => !photo.hide);
  const photo = place?.photos.find((p) => p.id === params.photoId);

  if (!photo || !place) {
    notFound();
  }

  return (
    <div>
      <PhotoViewer imageUrl={photo.panorama} imagesList={photos} />
    </div>
  );
}
