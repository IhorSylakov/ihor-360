import PhotoViewer from '@/components/PhotoViewer';
import { fetchPhotos, fetchOnePhoto } from '@/lib/firebaseHelpers';

interface PhotoPageProps {
  params: Promise<{
    username: string;
    country: string;
    city: string;
    place: string;
    photoid: string;
  }>;
}

export default async function PhotoViewerPage({ params }: PhotoPageProps) {
  const { username, place, photoid } = await params;
  const photos = await fetchPhotos(place, username);
  const photo = await fetchOnePhoto(photoid);

  return (
    <div>
      <PhotoViewer
        imageUrl={photo?.panorama ? photo?.panorama : ''}
        imagesList={photos}
        containerHeight='calc(100vh - var(--header-height))'
      />
    </div>
  );
}
