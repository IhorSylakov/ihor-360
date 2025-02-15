import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
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

    const info = await getPlaceInfo(userId, countryId, cityId, placeId);
    if (!info) {
      return NextResponse.json({ error: 'Place info not found' }, { status: 404 });
    }

    // ✅ Используем `adminDb` вместо `db`
    const snapshot = await adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .doc(cityId)
      .collection('places')
      .doc(placeId)
      .collection('photos')
      .get();

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
