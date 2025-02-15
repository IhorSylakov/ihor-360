import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Country } from '@/types/types';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;

    const snapshot = await adminDb.collection('users').doc(userId).collection('countries').get();
    const countries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(countries);
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
    const data = await req.json();
    const { name, description, visitDate } = data as Partial<Country>;

    const newCountry: Partial<Country> = { name };
    if (description) newCountry.description = description;
    if (visitDate) newCountry.visitDate = visitDate;

    const docRef = await adminDb.collection('users').doc(userId).collection('countries').add(newCountry );

    return NextResponse.json({ id: docRef.id, ...newCountry });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при добавлении страны' }, { status: 500 });
  }
}
