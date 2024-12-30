import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { City, Country, Photo, Place } from '@/types/types';

async function findIdByName(
  collectionName: string,
  name: string,
  userId?: string
): Promise<string | null> {
  const q = query(
    collection(db, collectionName),
    where('name', '==', name),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function fetchCountries(userId?: string): Promise<Country[]> {
  const q = query(
    collection(db, 'countries'),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Country[];
}

export async function fetchCities(countryName: string, userId?: string): Promise<City[]> {
  const countryId = await findIdByName('countries', countryName, userId);
  if (!countryId) {
    throw new Error(`Страна "${countryName}" не найдена`);
  }
  const q = query(
    collection(db, 'cities'),
    where('countryId', '==', countryId),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as City[];
}

export async function fetchPlaces(CityName: string, userId?: string): Promise<Place[]> {
  const cityId = await findIdByName('cities', CityName, userId);
  if (!cityId) {
    throw new Error(`Страна "${CityName}" не найдена`);
  }

  const q = query(
    collection(db, 'places'),
    where('cityId', '==', cityId),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Place[];
}

export async function fetchPhotos(PlaceName: string, userId?: string): Promise<Photo[]> {
  const placeId = await findIdByName('places', PlaceName, userId);
  if (!placeId) {
    throw new Error(`Страна "${PlaceName}" не найдена`);
  }

  const q = query(
    collection(db, 'photos'),
    where('placeId', '==', placeId),
    ...(userId ? [where('authorId', '==', userId)] : [])
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Photo[];
}

export async function fetchOnePhoto(PhotoId: string): Promise<Photo> {
  const photoRef = doc(db, 'photos', PhotoId);
  const photoSnapshot = await getDoc(photoRef);

  return photoSnapshot.data() as Photo;
}
