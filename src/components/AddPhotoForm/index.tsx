'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useFetchLocation } from '@/hooks/useFetchLocation';
import LocationSelect from './LocationSelect';

export default function AddPhotoForm() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const {countries, cities, places} = useFetchLocation(selectedCountry, selectedCity);

  const [newCountry, setNewCountry] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [title, setTitle] = useState('');
  const [hide, setHide] = useState(false);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setSelectedCountry('');
    setSelectedCity('');
    setSelectedPlace('');
    setNewCountry('');
    setNewCity('');
    setNewPlace('');
    setPhotoURL('');
    setThumbnailURL('');
    setTitle('');
    setHide(false);
    setDescription('');
    setMessage('');
  };

  const handleAddPhoto = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!selectedCountry && !newCountry.trim()) {
      setMessage('Выберите страну или введите её название.');
      return;
    }
  
    if (!selectedCity && !newCity.trim()) {
      setMessage('Выберите город или введите его название.');
      return;
    }
  
    if (!selectedPlace && !newPlace.trim()) {
      setMessage('Выберите место или введите его название.');
      return;
    }

    if (!title.trim()) {
      setMessage('Поле "Название" обязательно.');
      return;
    }

    try {
      let countryId = selectedCountry;
      if (!countryId && newCountry) {
        const countryDoc = await addDoc(collection(db, 'countries'), {
          name: newCountry,
        });
        countryId = countryDoc.id;
      }

      let cityId = selectedCity;
      if (!cityId && newCity) {
        const cityDoc = await addDoc(collection(db, 'cities'), {
          name: newCity,
          countryId,
        });
        cityId = cityDoc.id;
      }

      let placeId = selectedPlace;
      if (!placeId && newPlace) {
        const placeDoc = await addDoc(collection(db, 'places'), {
          name: newPlace,
          cityId,
          countryId,
        });
        placeId = placeDoc.id;
      }

      await addDoc(collection(db, 'photos'), {
        panorama: photoURL,
        thumbnail: thumbnailURL,
        title,
        hide,
        description,
        placeId,
        cityId,
        countryId,
      });

      setMessage('Фотография успешно добавлена!');
      resetForm();
    } catch (error) {
      console.error('Ошибка при добавлении фотографии:', error);
      setMessage('Ошибка при добавлении фотографии.');
    }
  };

  return (
    <form onSubmit={handleAddPhoto}>
      <h1>Добавить фотографию</h1>

      <LocationSelect
        label="Страна"
        options={countries}
        selected={selectedCountry}
        newValue={newCountry}
        setSelected={setSelectedCountry}
        setNewValue={setNewCountry}
      />
      <LocationSelect
        label="Город"
        options={cities}
        selected={selectedCity}
        newValue={newCity}
        setSelected={setSelectedCity}
        setNewValue={setNewCity}
      />
      <LocationSelect
        label="Место"
        options={places}
        selected={selectedPlace}
        newValue={newPlace}
        setSelected={setSelectedPlace}
        setNewValue={setNewPlace}
      />

      <div>
        <label>Ссылка на фотографию:</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Миниатюра (thumbnail):</label>
        <input
          type="text"
          value={thumbnailURL}
          onChange={(e) => setThumbnailURL(e.target.value)}
        />
      </div>

      <div>
        <label>Название:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={hide}
            onChange={(e) => setHide(e.target.checked)}
          />
          Скрыть фотографию
        </label>
      </div>

      <button type="submit">Добавить</button>
      {message && <p>{message}</p>}
    </form>
  );
}
