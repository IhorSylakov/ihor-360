import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Editor from '../Editor';

interface Place {
  id: string;
  name: string;
  description?: string;
  visitDate?: string;
  notes?: string;
  imageUrl?: string;
}

interface PlaceSectionProps {
  authorId: string;
  cityId: string;
  countryId: string;
  onSelectPlace: (placeId: string) => void;
  onNextSection: () => void;
}

const PlaceSection: React.FC<PlaceSectionProps> = ({ authorId, countryId, cityId, onSelectPlace, onNextSection }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const cityPlacesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places`);
        const querySnapshot = await getDocs(cityPlacesRef);
        const fetchedPlaces = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Place));
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('Ошибка при загрузке мест.');
      }
    };

    fetchPlaces();
  }, [authorId, countryId, cityId]);

  const handleSavePlace = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentPlace?.name || '')) {
      setError('Название места должно быть на английском языке.');
      return;
    }

    try {
      if (currentPlace?.id) {
        // Редактирование существующего места
        const placeRef = doc(db, 'users', authorId, `countries/${countryId}/cities/${cityId}/places`, currentPlace.id);
        const { ...placeData } = currentPlace;
        await updateDoc(placeRef, placeData);
        setPlaces((prev) =>
          prev.map((place) => (place.id === currentPlace.id ? { ...place, ...currentPlace } : place))
        );
      } else {
        // Добавление нового места
        const cityPlacesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places`);
        const docRef = await addDoc(cityPlacesRef, currentPlace);
        setPlaces([...places, { id: docRef.id, ...currentPlace } as Place]);
      }

      setShowForm(false);
      setCurrentPlace(null);
    } catch (error) {
      console.error('Error saving place:', error);
      setError('Ошибка при сохранении места.');
    }
  };

  const handleEdit = (place: Place) => {
    setCurrentPlace(place);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentPlace(null);
  };

  return (
    <div>
      <h2>Добавить или выбрать место</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название места"
            value={currentPlace?.name || ''}
            onChange={(e) => setCurrentPlace((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <Editor
            content={currentPlace?.description || ''}
            onUpdate={(updatedContent) =>
              setCurrentPlace((prev) => ({ ...prev!, description: updatedContent }))
            }
          />
          <input
            type="date"
            placeholder="Дата посещения (необязательно)"
            value={currentPlace?.visitDate || ''}
            onChange={(e) => setCurrentPlace((prev) => ({ ...prev!, visitDate: e.target.value }))}
          />
          <textarea
            placeholder="Заметки (необязательно)"
            value={currentPlace?.notes || ''}
            onChange={(e) => setCurrentPlace((prev) => ({ ...prev!, notes: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение (необязательно)"
            value={currentPlace?.imageUrl || ''}
            onChange={(e) => setCurrentPlace((prev) => ({ ...prev!, imageUrl: e.target.value }))}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleSavePlace}>{currentPlace?.id ? 'Сохранить изменения' : 'Добавить место'}</button>
          <button onClick={handleCancelForm}>Отмена</button>
        </div>
      ) : (
        <div>
          <ul>
            {places.length === 0 ? (
              <p>Нет доступных мест. Добавьте новое место.</p>
            ) : (
              places.map((place) => (
                <li key={place.id}>
                  <button onClick={() => { onSelectPlace(place.id); onNextSection(); }}>
                    {place.name}
                  </button>
                  <button onClick={() => handleEdit(place)}>Edit</button>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => {
            setCurrentPlace(null);
            setShowForm(true);
          }}>
            Добавить новое место
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaceSection;
