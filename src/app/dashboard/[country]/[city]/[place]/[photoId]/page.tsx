'use client';

import { useParams } from 'next/navigation';
import PhotoViewer from '@/components/PhotoViewer';
import { useLocation } from '@/context/LocationContext';
import { useEffect } from 'react';

export default function PhotoViewerPage() {
  const params = useParams() as { username: string, country: string; city: string; place: string; photoId: string };
  const { state, fetchPhotos, getPhoto } = useLocation();

  useEffect(() => {
    fetchPhotos(params.country, params.city, params.place);
  }, [fetchPhotos]);

  useEffect(() => {
    getPhoto(params.photoId)
  }, [getPhoto]);

  if (state.loading) return <p>Загрузка...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div>
      <PhotoViewer
        imageUrl={state.photo?.panorama ? state.photo?.panorama : ''}
        imagesList={state.photos}
        containerHeight='calc(100vh - var(--header-height))'
      />
    </div>
  );
}
