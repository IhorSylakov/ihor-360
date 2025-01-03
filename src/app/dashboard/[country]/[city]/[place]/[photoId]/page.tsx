import PhotoViewer from '@/components/PhotoViewer';
import { fetchPhotos, fetchOnePhoto } from '@/lib/firebaseHelpers';

interface PhotoPageProps {
  params: Promise<{
    country: string;
    city: string;
    place: string;
    photoId: string;
  }>;
}

export default async function PhotoViewerPage({ params }: PhotoPageProps) {
  const { place, photoId } = await params;
  const photos = await fetchPhotos(place);
  const photo = await fetchOnePhoto(photoId);

  return (
    <div>
      <PhotoViewer
        imageUrl={photo.panorama ? photo.panorama : ''}
        imagesList={photos}
        containerHeight='calc(100vh - var(--header-height))'
      />
    </div>
  );
}
