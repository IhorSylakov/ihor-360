import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PhotoSectionProps {
  authorId: string;
  countryId: string;
  cityId: string;
  placeId: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ authorId, countryId, cityId, placeId }) => {
  const [photosLength, setPhotosLength] = useState<number>(0);
  const [newPhoto, setNewPhoto] = useState({ imageUrl: '', isHidden: false, isPano: true, name: '', description: '', previewUrl: '' });
  const [uploadMethod, setUploadMethod] = useState<'cloudinary' | 'manual'>('cloudinary');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places/${placeId}/photos`);
        const querySnapshot = await getDocs(photosRef);
        const fetchedPhotos = querySnapshot.docs.length;
        setPhotosLength(fetchedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Ошибка при загрузке фотографий.');
      }
    };

    fetchPhotos();
  }, [authorId, countryId, cityId, placeId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setLoading(true);

    const data = await response.json();
    if (response.ok) {
      setNewPhoto({ ...newPhoto, imageUrl: data.url });
    } else {
      setError(data.error?.message || 'Ошибка при загрузке изображения.');
    }
    setLoading(false);
  };

  const handleAddPhoto = async () => {
    setError('');

    if (!newPhoto.imageUrl) {
      setError('Ссылка на изображение обязательна.');
      return;
    }

    try {
      const photosRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places/${placeId}/photos`);
      const nextOrder = photosLength + 1;
      const photoData = {
        ...newPhoto,
        placeId,
        order: nextOrder,
      };
      // const docRef = 
      await addDoc(photosRef, photoData);

      // setPhotos([...photos, { id: docRef.id, ...photoData }]);
      setNewPhoto({ imageUrl: '', isHidden: false, isPano: true, name: '', description: '', previewUrl: '' });
    } catch (error) {
      console.error('Error adding photo:', error);
      setError('Ошибка при добавлении фотографии.');
    }
  };

  return (
    <div>
      <h2>Добавить новое фото</h2>

      <div>
        <label>
          <input
            type="radio"
            value="cloudinary"
            checked={uploadMethod === 'cloudinary'}
            onChange={() => setUploadMethod('cloudinary')}
          />
          Загрузить на Cloudinary
        </label>
        <label>
          <input
            type="radio"
            value="manual"
            checked={uploadMethod === 'manual'}
            onChange={() => setUploadMethod('manual')}
          />
          Вставить URL вручную
        </label>
      </div>
      
      <div>
        {newPhoto.imageUrl &&
          <Image
            width={100}
            height={30}
            style={{ objectFit: 'cover' }}
            alt=""
            src={newPhoto.imageUrl}
          />
        }
        {uploadMethod === 'cloudinary' ? (
          <div>
            <input type="file" onChange={handleFileChange} disabled={loading} />
            <button onClick={handleUpload}>Upload</button>
            {loading && <p>Загрузка...</p>}
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Введите URL изображения"
              defaultValue={newPhoto.imageUrl}
              onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
            />
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={newPhoto.isHidden}
            onChange={(e) => setNewPhoto({ ...newPhoto, isHidden: e.target.checked })}
          />
          Скрыть фото
        </label>
        <label>
          <input
            type="checkbox"
            checked={newPhoto.isPano}
            onChange={(e) => setNewPhoto({ ...newPhoto, isPano: e.target.checked })}
          />
          is it pano?
        </label>
        <input
          type="text"
          placeholder="Название (необязательно)"
          value={newPhoto.name}
          onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={newPhoto.description}
          onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ссылка на превью (необязательно)"
          value={newPhoto.previewUrl}
          onChange={(e) => setNewPhoto({ ...newPhoto, previewUrl: e.target.value })}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleAddPhoto}>Добавить фото</button>
      </div>
    </div>
  );
};

export default PhotoSection;
