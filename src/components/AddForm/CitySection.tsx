import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [newCity, setNewCity] = useState({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const countryCitiesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities`);
        const querySnapshot = await getDocs(countryCitiesRef);
        const countryCities = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as City));
        setCities(countryCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Ошибка при загрузке городов.');
      }
    };

    fetchCities();
  }, [authorId, countryId]);

  const handleAddCity = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(newCity.name)) {
      setError('Название города должно быть на английском языке.');
      return;
    }

    try {
      const countryCitiesRef = collection(doc(db, 'users', authorId), `countries/${countryId}/cities`);
      const docRef = await addDoc(countryCitiesRef, newCity);
      const addedCity = { id: docRef.id, ...newCity };

      setCities([...cities, addedCity]);
      setNewCity({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
      setShowForm(false);

      onSelectCity(docRef.id);
      onNextSection();
    } catch (error) {
      console.error('Error adding city:', error);
      setError('Ошибка при добавлении города.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewCity({ name: '', description: '', visitDate: '', notes: '', imageUrl: '' });
  };

  return (
    <div>
      <h2>Добавить или выбрать город</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название города"
            value={newCity.name}
            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
          />
          <textarea
            placeholder="Описание (необязательно)"
            value={newCity.description}
            onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
          />
          <input
            type="date"
            placeholder="Дата посещения (необязательно)"
            value={newCity.visitDate}
            onChange={(e) => setNewCity({ ...newCity, visitDate: e.target.value })}
          />
          <textarea
            placeholder="Заметки (необязательно)"
            value={newCity.notes}
            onChange={(e) => setNewCity({ ...newCity, notes: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение (необязательно)"
            value={newCity.imageUrl}
            onChange={(e) => setNewCity({ ...newCity, imageUrl: e.target.value })}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleAddCity}>Добавить город</button>
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
                </li>
              ))
            )}
          </ul>
          <button onClick={() => setShowForm(true)}>Добавить новый город</button>
        </div>
      )}
    </div>
  );
};

export default CitySection;
