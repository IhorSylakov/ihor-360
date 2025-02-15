import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
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
        
    const info = await getCountryInfo(userId, countryId);
    if (!info) {
      return NextResponse.json({ error: 'Country info not found' }, { status: 404 });
    }

    // ✅ Используем adminDb вместо db
    const snapshot = await adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .get();

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
