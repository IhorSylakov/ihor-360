import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
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
  const [newPlace, setNewPlace] = useState({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const cityPlacesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places`);
        const querySnapshot = await getDocs(cityPlacesRef);
        const countryPlaces = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Place));
        setPlaces(countryPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('Ошибка при загрузке мест.');
      }
    };

    fetchPlaces();
  }, [authorId, countryId, cityId]);

  const handleAddPlace = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(newPlace.name)) {
      setError('Название места должно быть на английском языке.');
      return;
    }

    try {
      const cityPlacesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities/${cityId}/places`);
      const docRef = await addDoc(cityPlacesRef, newPlace);
      const addedPlace = { id: docRef.id, ...newPlace };

      setPlaces([...places, addedPlace]);
      setNewPlace({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
      setShowForm(false);

      onSelectPlace(docRef.id);
      onNextSection();
    } catch (error) {
      console.error('Error adding place:', error);
      setError('Ошибка при добавлении места.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewPlace({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
  };

  return (
    <div>
      <h2>Добавить или выбрать место</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название места"
            value={newPlace.name}
            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
          />

          <Editor content={newPlace.description} onUpdate={(updatedContent) => setNewPlace((prev) => ({ ...prev, description: updatedContent}))} />

          <input
            type="date"
            placeholder="Дата посещения (необязательно)"
            value={newPlace.visitDate}
            onChange={(e) => setNewPlace({ ...newPlace, visitDate: e.target.value })}
          />
          <textarea
            placeholder="Заметки (необязательно)"
            value={newPlace.notes}
            onChange={(e) => setNewPlace({ ...newPlace, notes: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение (необязательно)"
            value={newPlace.imageUrl}
            onChange={(e) => setNewPlace({ ...newPlace, imageUrl: e.target.value })}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleAddPlace}>Добавить место</button>
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
                </li>
              ))
            )}
          </ul>
          <button onClick={() => setShowForm(true)}>Добавить новый место</button>
        </div>
      )}
    </div>
  );
};

export default PlaceSection;
