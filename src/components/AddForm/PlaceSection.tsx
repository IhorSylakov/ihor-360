import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import { Place } from '@/types/types';

interface PlaceSectionProps {
  countryId: string;
  cityId: string;
  onSelectPlace: (placeId: string) => void;
  onNextSection: () => void;
}

const PlaceSection: React.FC<PlaceSectionProps> = ({ countryId, cityId, onSelectPlace, onNextSection }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`/api/places?countryId=${countryId}&cityId=${cityId}`);
        if (!res.ok) throw new Error('Ошибка при загрузке мест');
        const data = await res.json();
        setPlaces(data);
      } catch (error) {
        console.error(error);
        setError('Ошибка при загрузке мест.');
      }
    };

    fetchPlaces();
  }, [countryId, cityId]);

  const handleSavePlace = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentPlace?.name || '')) {
      setError('Название места должно быть на английском языке.');
      return;
    }

    try {
      const method = currentPlace?.id ? 'PUT' : 'POST';
      const url = currentPlace?.id ? `/api/places/${currentPlace.id}` : '/api/places';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentPlace, countryId, cityId }),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении места');

      const savedPlace = await res.json();
      setPlaces((prev) =>
        prev.some((p) => p.id === savedPlace.id)
          ? prev.map((p) => (p.id === savedPlace.id ? savedPlace : p))
          : [...prev, savedPlace]
      );

      setShowForm(false);
      setCurrentPlace(null);
    } catch (error) {
      console.error(error);
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
