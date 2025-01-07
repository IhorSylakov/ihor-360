import { NextResponse } from 'next/server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { findCountryId, findUserId, getCountryInfo } from '@/lib/firebaseHelpers';

interface RouteParams {
  params: Promise<{
    username: string;
    country: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { username, country } = await params;

  try {
    const userId = await findUserId(username);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const countryId = await findCountryId(userId, country);
    if (!countryId) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }
        
    const info = await getCountryInfo(userId, countryId)
    if (!info) {
      return NextResponse.json({ error: 'Place info not found' }, { status: 404 });
    }

    const citiesRef = collection(doc(db, `users/${userId}/countries/${countryId}`), 'cities');
    const snapshot = await getDocs(citiesRef);

    const cities = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ cities, info });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}
