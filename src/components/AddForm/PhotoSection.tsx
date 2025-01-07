import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// interface Photo {
//   id: string;
//   imageUrl: string;
//   isHidden: boolean;
//   name?: string;
//   description?: string;
//   previewUrl?: string;
//   placeId: string;
//   order: number;
// }

interface PhotoSectionProps {
  authorId: string;
  countryId: string;
  cityId: string;
  placeId: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ authorId, countryId, cityId, placeId }) => {
  // const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLength, setPhotosLength] = useState<number>(0);
  const [newPhoto, setNewPhoto] = useState({ imageUrl: '', isHidden: false, name: '', description: '', previewUrl: '' });
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchPhotos = async () => {
  //     try {
  //       const photosRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places/${placeId}/photos`);
  //       const querySnapshot = await getDocs(photosRef);
  //       const fetchedPhotos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Photo));
  //       setPhotos(fetchedPhotos);
  //     } catch (error) {
  //       console.error('Error fetching photos:', error);
  //       setError('Ошибка при загрузке фотографий.');
  //     }
  //   };

  //   fetchPhotos();
  // }, [authorId, countryId, cityId, placeId]);

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
      setNewPhoto({ imageUrl: '', isHidden: false, name: '', description: '', previewUrl: '' });
    } catch (error) {
      console.error('Error adding photo:', error);
      setError('Ошибка при добавлении фотографии.');
    }
  };

  return (
    <div>
      <h2>Добавить новое фото</h2>

      <div>
        <input
          type="text"
          placeholder="Ссылка на изображение"
          value={newPhoto.imageUrl}
          onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newPhoto.isHidden}
            onChange={(e) => setNewPhoto({ ...newPhoto, isHidden: e.target.checked })}
          />
          Скрыть фото
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
