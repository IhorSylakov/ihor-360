import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import PhotoViewer from '@/components/PhotoViewer';
import { Photo } from '@/types/types';
import styles from '../../../index.module.css';

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

  const panoPhotos = await data.photos.filter((photo: Photo) => photo.isPano)
  const justPhotos = await data.photos.filter((photo: Photo) => !photo.isPano)

  return (
    <div className="page">
      <div className="page-content">
        <h1>{data.info.name}</h1>
        {panoPhotos.length > 0 && (
          <PhotoViewer
            imageUrl={panoPhotos[0].imageUrl}
            imagesList={panoPhotos}
            containerHeight='400px'
          />
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
