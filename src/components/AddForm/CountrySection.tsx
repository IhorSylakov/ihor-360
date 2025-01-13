import React, { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Editor from '../Editor';

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
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
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

  const handleSaveCountry = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentCountry?.name || '')) {
      setError('Название страны должно быть на английском языке.');
      return;
    }


    try {
      if (currentCountry?.id) {
        // Редактирование существующей страны
        const countryRef = doc(db, 'users', authorId, `countries`, currentCountry.id);
        const { ...countryData } = currentCountry;
        await updateDoc(countryRef, countryData);
        setCountries((prev) =>
          prev.map((country) => (country.id === currentCountry.id ? { ...country, ...currentCountry } : country))
        );
      } else {
        // Добавление новой страны
        const userCountriesRef = collection(doc(db, 'users', authorId), `countries`);
        const docRef = await addDoc(userCountriesRef, currentCountry);
        setCountries([...countries, { id: docRef.id, ...currentCountry } as Country]);
      }

      setShowForm(false);
      setCurrentCountry(null);
    } catch (error) {
      console.error('Error adding country:', error);
      setError('Ошибка при добавлении страны.');
    }
  };

  const handleEdit = (country: Country) => {
    setCurrentCountry(country);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentCountry(null);
  };

  return (
    <div>
      <h2>Добавить или выбрать страну</h2>

      {showForm ? (
        <div>
          <input
            type="text"
            placeholder="Название страны"
            value={currentCountry?.name}
            onChange={(e) => setCurrentCountry((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <input
            type="date"
            placeholder="Дата посещения"
            value={currentCountry?.visitDate}
            onChange={(e) => setCurrentCountry((prev) => ({ ...prev!, visitDate: e.target.value }))}
          />
          <Editor
            content={currentCountry?.description || ''}
            onUpdate={(updatedContent) =>
              setCurrentCountry((prev) => ({ ...prev!, description: updatedContent }))
            }
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleSaveCountry}>{currentCountry?.id ? 'Сохранить изменения' : 'Добавить страну'}</button>
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
                  <button onClick={() => handleEdit(country)}>Edit</button>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => {
            setCurrentCountry(null);
            setShowForm(true);
          }}>
            Добавить новую страну
          </button>
        </div>
      )}
    </div>
  );
};

export default CountrySection;
