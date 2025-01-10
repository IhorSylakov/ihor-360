import { NextResponse } from 'next/server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const countriesRef = collection(doc(db, 'users', userId), 'countries');
    const countriesSnapshot = await getDocs(countriesRef);

    const countries = [];

    for (const countryDoc of countriesSnapshot.docs) {
      const countryData = countryDoc.data();
      const citiesRef = collection(countryDoc.ref, 'cities');
      const citiesSnapshot = await getDocs(citiesRef);

      const cities = [];

      for (const cityDoc of citiesSnapshot.docs) {
        const cityData = cityDoc.data();
        const placesRef = collection(cityDoc.ref, 'places');
        const placesSnapshot = await getDocs(placesRef);

        const places = [];

        for (const placeDoc of placesSnapshot.docs) {
          const placeData = placeDoc.data();
          const photosRef = collection(placeDoc.ref, 'photos');
          const photosSnapshot = await getDocs(photosRef);

          const photos = photosSnapshot.docs.map((photoDoc) => photoDoc.data());

          places.push({
            id: placeDoc.id,
            ...placeData,
            photos,
          });
        }

        cities.push({
          id: cityDoc.id,
          ...cityData,
          places,
        });
      }

      countries.push({
        id: countryDoc.id,
        ...countryData,
        cities,
      });
    }

    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
