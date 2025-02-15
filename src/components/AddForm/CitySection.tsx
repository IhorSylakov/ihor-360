import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import { City } from '@/types/types';

interface CitySectionProps {
  countryId: string;
  onSelectCity: (cityId: string) => void;
  onNextSection: () => void;
}

const CitySection: React.FC<CitySectionProps> = ({ countryId, onSelectCity, onNextSection }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`/api/cities?countryId=${countryId}`);
        if (!res.ok) throw new Error('Ошибка при загрузке городов');
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
        setError('Ошибка при загрузке городов.');
      }
    };

    fetchCities();
  }, [countryId]);

  const handleSaveCity = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentCity?.name || '')) {
      setError('Название города должно быть на английском языке.');
      return;
    }

    try {
      const method = currentCity?.id ? 'PUT' : 'POST';
      const url = currentCity?.id ? `/api/cities/${currentCity.id}` : '/api/cities';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentCity, countryId }),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении города');

      const savedCity = await res.json();
      setCities((prev) =>
        prev.some((c) => c.id === savedCity.id)
          ? prev.map((c) => (c.id === savedCity.id ? savedCity : c))
          : [...prev, savedCity]
      );

      setShowForm(false);
      setCurrentCity(null);
    } catch (error) {
      console.error(error);
      setError('Ошибка при сохранении города.');
    }
  };

  const handleEdit = (city: City) => {
    setCurrentCity(city);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentCity(null);
  };

  return (
    <div>
      <h2>Добавить или выбрать город</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название города"
            value={currentCity?.name || ''}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <Editor
            content={currentCity?.description || ''}
            onUpdate={(updatedContent) =>
              setCurrentCity((prev) => ({ ...prev!, description: updatedContent }))
            }
          />
          <input
            type="date"
            placeholder="Дата посещения (необязательно)"
            value={currentCity?.visitDate || ''}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, visitDate: e.target.value }))}
          />
          <textarea
            placeholder="Заметки (необязательно)"
            value={currentCity?.notes || ''}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, notes: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение (необязательно)"
            value={currentCity?.imageUrl || ''}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, imageUrl: e.target.value }))}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleSaveCity}>{currentCity?.id ? 'Сохранить изменения' : 'Добавить город'}</button>
          <button onClick={handleCancelForm}>Отмена</button>
        </div>
      ) : (
        <div>
          <ul>
            {cities.length === 0 ? (
              <p>Нет доступных городов. Добавьте новый город.</p>
            ) : (
              cities.map((city) => (
                <li key={city.id}>
                  <button onClick={() => { onSelectCity(city.id); onNextSection(); }}>
                    {city.name}
                  </button>
                  <button onClick={() => handleEdit(city)}>Edit</button>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => {
            setCurrentCity(null);
            setShowForm(true);
          }}>
            Добавить новый город
          </button>
        </div>
      )}
    </div>
  );
};

export default CitySection;
