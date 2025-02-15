import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import { Photo } from '@/types/types';
import styles from '../../../index.module.css';
import { lazy, Suspense } from 'react';

interface UserPlacePage {
  params: Promise<{
    username: string;
    country: string;
    city: string;
    place: string;
  }>;
}

const PhotoViewer = lazy(() => import ('@/components/PhotoViewer'))

export default async function PlacePage({ params }: UserPlacePage ) {
  const { username, country, city, place } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}/${country}/${city}/${place}`);
  if (!res.ok) {
    return <div>Ошибка загрузки мест.</div>;
  }

  const data = await res.json();

  const panoPhotos = await data.photos.filter((photo: Photo) => photo.isPano);
  const justPhotos = await data.photos.filter((photo: Photo) => !photo.isPano);

  return (
    <div className="page">
      <div className="page-content">
        <h1>{data.info.name}</h1>
        {panoPhotos.length > 0 && (
          <Suspense fallback={(
            <p
              style={{
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'pink',
                margin: '0 calc(-1 * var(--landing-content-indents-px))'
              }}
            >
              loading...
            </p>
          )}>
            <PhotoViewer
              imageUrl={panoPhotos[0].imageUrl}
              imagesList={panoPhotos}
              containerHeight='500px'
            />
          </Suspense>
        )}
        {justPhotos.length > 0 && (
          <ul>
            {justPhotos.map((photo: Photo) => (
              <li key={photo.id}>
                <Image
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  alt=""
                  src={photo.imageUrl}
                />
              </li>
            ))}
          </ul>
        )}
        {data.info.description && (
          <div
            className={styles.Content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.info.description) }}
          />
        )}
      </div>
    </div>
  );
}
