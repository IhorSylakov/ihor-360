import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { City } from '@/types/types';

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

    if (!countryId) {
      return NextResponse.json({ error: 'countryId обязателен' }, { status: 400 });
    }

    const snapshot = await adminDb.collection('users').doc(userId).collection('countries').doc(countryId).collection('cities').get();
    const cities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(cities);
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
    const { name, description, visitDate, notes, imageUrl, countryId } = await req.json();
    
    const newCity: Partial<City> = { name };
    if (description) newCity.description = description;
    if (visitDate) newCity.visitDate = visitDate;
    if (notes) newCity.notes = notes;
    if (imageUrl) newCity.imageUrl = imageUrl;

    if (!countryId || !name) {
      return NextResponse.json({ error: 'countryId и name обязательны' }, { status: 400 });
    }

    const docRef = await adminDb.collection('users').doc(userId).collection('countries').doc(countryId).collection('cities').add(newCity);

    return NextResponse.json({ id: docRef.id, ...newCity });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при добавлении города' }, { status: 500 });
  }
}

