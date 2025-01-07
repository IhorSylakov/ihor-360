import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { City, Country, Place } from '@/types/types';

export async function findUserId(username: string): Promise<string | null> {
  const userQuery = query(collection(db, 'users'), where('username', '==', username));
  const snapshot = await getDocs(userQuery);
  return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function findCountryId(userId: string, countryName: string): Promise<string | null> {
  const countryQuery = query(
    collection(doc(db, `users/${userId}`), 'countries'),
    where('name', '==', countryName)
  );
  const snapshot = await getDocs(countryQuery);
  return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function getCountryInfo(
  userId: string,
  countryId: string,
): Promise<Country | null> {
  const countryRef = doc(db, `users/${userId}/countries/`, countryId);
  const snapshot = await getDoc(countryRef);

  return snapshot.data() as Country;
}

export async function findCityId(
  userId: string,
  countryId: string,
  cityName: string
): Promise<string | null> {
  const cityQuery = query(
    collection(doc(db, `users/${userId}/countries/${countryId}`), 'cities'),
    where('name', '==', cityName)
  );
  const snapshot = await getDocs(cityQuery);
  return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function getCityInfo(
  userId: string,
  countryId: string,
  cityId: string
): Promise<City | null> {
  const cityRef = doc(db, `users/${userId}/countries/${countryId}/cities/`, cityId);
  const snapshot = await getDoc(cityRef);

  return snapshot.data() as City;
}

export async function findPlaceId(
  userId: string,
  countryId: string,
  cityId: string,
  placeName: string
): Promise<string | null> {
  const placeQuery = query(
    collection(doc(db, `users/${userId}/countries/${countryId}/cities/${cityId}`), 'places'),
    where('name', '==', placeName)
  );
  const snapshot = await getDocs(placeQuery);
  return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function getPlaceInfo(
  userId: string,
  countryId: string,
  cityId: string,
  placeId: string
): Promise<Place | null> {
  const placeRef = doc(db, `users/${userId}/countries/${countryId}/cities/${cityId}/places`, placeId);
  const snapshot = await getDoc(placeRef);

  return snapshot.data() as Place;
}
