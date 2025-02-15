import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Place } from '@/types/types';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');

    if (!countryId || !cityId) {
      return NextResponse.json({ error: 'countryId и cityId обязательны' }, { status: 400 });
    }

    const snapshot = await adminDb.collection('users').doc(userId).collection('countries').doc(countryId).collection('cities').doc(cityId).collection('places').get();
    const places = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(places);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;
    const { name, description, visitDate, notes, imageUrl, countryId, cityId } = await req.json();

    if (!countryId || !cityId || !name) {
      return NextResponse.json({ error: 'countryId, cityId и name обязательны' }, { status: 400 });
    }

    const newPlace: Partial<Place> = { name };
    if (description) newPlace.description = description;
    if (visitDate) newPlace.visitDate = visitDate;
    if (notes) newPlace.notes = notes;
    if (imageUrl) newPlace.imageUrl = imageUrl;

    const docRef = await adminDb.collection('users').doc(userId).collection('countries').doc(countryId).collection('cities').doc(cityId).collection('places').add(newPlace);

    return NextResponse.json({ id: docRef.id, ...newPlace });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при добавлении места' }, { status: 500 });
  }
}
