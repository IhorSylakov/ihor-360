import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import { Country } from '@/types/types';

interface CountrySectionProps {
  onSelectCountry: (countryId: string) => void;
  onNextSection: () => void;
}

const CountrySection: React.FC<CountrySectionProps> = ({ onSelectCountry, onNextSection }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('/api/countries');
        if (!res.ok) throw new Error('Ошибка при загрузке стран');
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
        setError('Ошибка при загрузке стран.');
      }
    };

    fetchCountries();
  }, []);

  const handleSaveCountry = async () => {
    setError('');
    if (!/^[a-zA-Z ]+$/.test(currentCountry?.name || '')) {
      setError('Название страны должно быть на английском языке.');
      return;
    }

    try {
      const method = currentCountry?.id ? 'PUT' : 'POST';
      const url = currentCountry?.id ? `/api/countries/${currentCountry.id}` : '/api/countries';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCountry),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении страны');

      const savedCountry = await res.json();
      setCountries((prev) =>
        prev.some((c) => c.id === savedCountry.id)
          ? prev.map((c) => (c.id === savedCountry.id ? savedCountry : c))
          : [...prev, savedCountry]
      );

      setShowForm(false);
      setCurrentCountry(null);
    } catch (error) {
      console.error(error);
      setError('Ошибка при сохранении страны.');
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
            value={currentCountry?.name || ''}
            onChange={(e) => setCurrentCountry((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <input
            type="date"
            placeholder="Дата посещения"
            value={currentCountry?.visitDate || ''}
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
