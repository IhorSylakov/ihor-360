'use client';

import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import { Photo } from '@/data/countryData';

interface PhotoViewerProps {
  imageUrl: string;
  imagesList: Photo[];
  containerHeight?: string;
}

const baseUrl = 'https://rest-api-prod-us-east-1-799789241931.s3.us-east-1.amazonaws.com/user_1866919/';
const thumbUrl = 'https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/';

const PhotoViewer: React.FC<PhotoViewerProps> = ({ imageUrl, imagesList, containerHeight = '100vh' }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: baseUrl + imageUrl,
      plugins: [
        [GalleryPlugin, {
          visibleOnLoad: true,
          hideOnClick: false,
          thumbnailSize: { width: 100, height: 50 },
          items: imagesList.map((photo) => ({
            ...photo,
            name: '',
            panorama: baseUrl + photo.panorama,
            thumbnail: thumbUrl + photo.panorama,
          })),
        }],
      ],
    });

    viewer.navbar.getButton('download').hide();

    return () => {
      viewer.destroy();
    };
  }, [imageUrl, imagesList]);

  return (
    <div
      ref={viewerRef}
      style={{
        height: containerHeight,
        margin: '0 calc(-1 * var(--main-indents))'
      }}
    />
  );
};

export default PhotoViewer;
