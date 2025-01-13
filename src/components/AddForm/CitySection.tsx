import React, { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Editor from '../Editor';

interface City {
  id: string;
  name: string;
  description?: string;
  visitDate?: string;
  notes?: string;
  imageUrl?: string;
}

interface CitySectionProps {
  authorId: string;
  countryId: string;
  onSelectCity: (cityId: string) => void;
  onNextSection: () => void;
}

const CitySection: React.FC<CitySectionProps> = ({ authorId, countryId, onSelectCity, onNextSection }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const countryCitiesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities`);
        const querySnapshot = await getDocs(countryCitiesRef);
        const fetchedCities = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as City));
        setCities(fetchedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Ошибка при загрузке городов.');
      }
    };

    fetchCities();
  }, [authorId, countryId]);

  const handleSaveCity = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentCity?.name || '')) {
      setError('Название города должно быть на английском языке.');
      return;
    }

    try {
      if (currentCity?.id) {
        // Редактирование существующего города
        const placeRef = doc(db, 'users', authorId, `countries/${countryId}/cities`, currentCity.id);
        const { ...placeData } = currentCity;
        await updateDoc(placeRef, placeData);
        setCities((prev) =>
          prev.map((place) => (place.id === currentCity.id ? { ...place, ...currentCity } : place))
        );
      } else {
        // Добавление нового города
        const countryCitiesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities`);
        const docRef = await addDoc(countryCitiesRef, currentCity);
        setCities([...cities, { id: docRef.id, ...currentCity } as City]);
      }
      
      setShowForm(false);
      setCurrentCity(null);
    } catch (error) {
      console.error('Error adding city:', error);
      setError('Ошибка при добавлении города.');
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
            value={currentCity?.name}
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
            value={currentCity?.visitDate}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, visitDate: e.target.value }))}
          />
          <textarea
            placeholder="Заметки (необязательно)"
            value={currentCity?.notes}
            onChange={(e) => setCurrentCity((prev) => ({ ...prev!, notes: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение (необязательно)"
            value={currentCity?.imageUrl}
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
