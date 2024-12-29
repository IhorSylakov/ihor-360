import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { City, Country, Place } from '@/types/types';

export async function fetchCountries(username?: string): Promise<Country[]> {
  let countryQuery;
  let userId: string | undefined;

  if (username) {
    const userQuery = query(
      collection(db, 'users'),
      where('username', '==', username)
    );
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      userId = userSnapshot.docs[0].id;
    } else {
      throw new Error(`"${userId}" не найден`);
    }
  }

  if (userId) {
    countryQuery = query(collection(db, 'countries'), where('authorId', '==', userId));
  } else {
    countryQuery = query(collection(db, 'countries'));
  }

  const CountrySnapshot = await getDocs(countryQuery);
  return CountrySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Country[];
}

export async function fetchCities(countryName: string, userId?: string): Promise<City[]> {
  let countryId: string | undefined;

  if (countryName) {
    const countryQuery = query(
      collection(db, 'countries'),
      where('name', '==', countryName),
      ...(userId ? [where('authorId', '==', userId)] : [])
    );
    const countrySnapshot = await getDocs(countryQuery);
    if (!countrySnapshot.empty) {
      countryId = countrySnapshot.docs[0].id;
    } else {
      throw new Error(`Страна с именем "${countryName}" не найдена`);
    }
  }
  const cityQuery = query(
    collection(db, 'cities'),
    where('countryId', '==', countryId),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const citySnapshot = await getDocs(cityQuery);
  return citySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as City[];
}

export async function fetchPlaces(CityName: string, userId?: string): Promise<Place[]> {
  let cityId: string | undefined;

  if (CityName) {
    const cityQuery = query(
      collection(db, 'cities'),
      where('name', '==', CityName),
      ...(userId ? [where('authorId', '==', userId)] : [])
    );
    const citySnapshot = await getDocs(cityQuery);
    if (!citySnapshot.empty) {
      cityId = citySnapshot.docs[0].id;
    } else {
      throw new Error(`Город с именем "${CityName}" не найден`);
    }
  }
  const placeQuery = query(
    collection(db, 'places'),
    where('cityId', '==', cityId),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const placeSnapshot = await getDocs(placeQuery);
  return placeSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Place[];
}
