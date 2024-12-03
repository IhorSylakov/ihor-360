declare module 'photo-sphere-viewer' {
  interface PhotoSphereViewerOptions {
    container: HTMLElement;
    panorama: string;
    navbar?: boolean;
  }

  class PhotoSphereViewer {
    constructor(options: PhotoSphereViewerOptions);
    destroy(): void;
  }

  export = PhotoSphereViewer;
}
