import { NextResponse } from 'next/server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { findCityId, findCountryId, findUserId, getCityInfo } from '@/lib/firebaseHelpers';

interface RouteParams {
  params: Promise<{
    username: string;
    country: string;
    city: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { username, country, city } = await params;

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
    
    const info = await getCityInfo(userId, countryId, cityId)
    if (!info) {
      return NextResponse.json({ error: 'Place info not found' }, { status: 404 });
    }

    const placesRef = collection(doc(db, `users/${userId}/countries/${countryId}/cities/${cityId}`), 'places');
    const snapshot = await getDocs(placesRef);

    const places = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ places, info });
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
  }
}
