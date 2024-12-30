'use client';

import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import { Photo } from '@/types/types';

interface PhotoViewerProps {
  imageUrl: string;
  imagesList: Photo[];
  containerHeight?: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ imageUrl, imagesList, containerHeight = '100vh' }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: imageUrl,
      plugins: [
        [GalleryPlugin, {
          visibleOnLoad: true,
          hideOnClick: false,
          thumbnailSize: { width: 100, height: 50 },
          items: imagesList.map((photo) => ({
            ...photo,
            name: '',
            panorama: photo.panorama,
            thumbnail: photo.thumbnail,
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
