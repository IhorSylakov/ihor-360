import { NextResponse } from 'next/server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { findCityId, findCountryId, findPlaceId, findUserId, getPlaceInfo } from '@/lib/firebaseHelpers';

interface RouteParams {
  params: Promise<{
    username: string;
    country: string;
    city: string;
    place: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { username, country, city, place } = await params;

  try {
    const userId = await findUserId(username);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const countryId = await findCountryId(userId, country);
    if (!countryId) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    const cityId = await findCityId(userId, countryId, city);
    if (!cityId) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const placeId = await findPlaceId(userId, countryId, cityId, place);
    if (!placeId) {
      return NextResponse.json({ error: 'Place not found' }, { status: 404 });
    }

    const info = await getPlaceInfo(userId, countryId, cityId, placeId)
    if (!info) {
      return NextResponse.json({ error: 'Place info not found' }, { status: 404 });
    }

    const photosRef = collection(doc(db, `users/${userId}/countries/${countryId}/cities/${cityId}/places/${placeId}`), 'photos');
    const snapshot = await getDocs(photosRef);

    const photos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ photos, info });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
