import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CityName, CountryName, PlaceName } from '@/data/countryData';

export const useFetchLocation = (selectedCountry: string, selectedCity: string) => {
  const [countries, setCountries] = useState<CountryName[]>([]);
  const [cities, setCities] = useState<CityName[]>([]);
  const [places, setPlaces] = useState<PlaceName[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const q = query(collection(db, 'countries'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CountryName[];
      setCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCities = async () => {
      const q = query(
        collection(db, 'cities'),
        where('countryId', '==', selectedCountry)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CityName[];
      setCities(data);
    };
    fetchCities();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCity) return;
    const fetchPlaces = async () => {
      const q = query(
        collection(db, 'places'),
        where('cityId', '==', selectedCity)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PlaceName[];
      setPlaces(data);
    };
    fetchPlaces();
  }, [selectedCity]);

  return {countries, cities, places};
};
