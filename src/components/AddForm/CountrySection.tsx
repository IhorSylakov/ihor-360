import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Country {
  id: string;
  name: string;
  description?: string;
  visitDate: string;
}

interface CountrySectionProps {
  authorId: string;
  onSelectCountry: (countryId: string) => void;
  onNextSection: () => void;
}

const CountrySection: React.FC<CountrySectionProps> = ({ authorId, onSelectCountry, onNextSection }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState({ name: '', visitDate: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const userCountriesRef = collection(doc(db, 'users', authorId), 'countries');
        const querySnapshot = await getDocs(userCountriesRef);
        const userCountries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Country));
        setCountries(userCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Ошибка при загрузке стран.');
      }
    };

    fetchCountries();
  }, [authorId]);

  const handleAddCountry = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(newCountry.name)) {
      setError('Название страны должно быть на английском языке.');
      return;
    }
    if (!newCountry.visitDate) {
      setError('Дата посещения обязательна.');
      return;
    }


    try {
      const userCountriesRef = collection(doc(db, 'users', authorId), 'countries');
      const docRef = await addDoc(userCountriesRef, newCountry);
      const addedCountry = { id: docRef.id, ...newCountry };

      setCountries([...countries, addedCountry]);
      setNewCountry({ name: '', visitDate: '', description: '' });
      setShowForm(false);

      onSelectCountry(docRef.id);
      onNextSection();
    } catch (error) {
      console.error('Error adding country:', error);
      setError('Ошибка при добавлении страны.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewCountry({ name: '', visitDate: '', description: '' });
  };

  return (
    <div>
      <h2>Добавить или выбрать страну</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название страны"
            value={newCountry.name}
            onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Дата посещения"
            value={newCountry.visitDate}
            onChange={(e) => setNewCountry({ ...newCountry, visitDate: e.target.value })}
          />
          <textarea
            placeholder="Описание (необязательно)"
            value={newCountry.description}
            onChange={(e) => setNewCountry({ ...newCountry, description: e.target.value })}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleAddCountry}>Добавить страну</button>
          <button onClick={handleCancelForm}>Отмена</button>
        </div>
      ) : (
        <div>
          <ul>
            {countries.length === 0 ? (
              <p>Нет доступных стран. Добавьте новую страну.</p>
            ) : (
              countries.map((country) => (
                <li key={country.id}>
                  <button onClick={() => { onSelectCountry(country.id); onNextSection(); }}>
                    {country.name}
                  </button>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => setShowForm(true)}>Добавить новую страну</button>
        </div>
      )}
    </div>
  );
};

export default CountrySection;
