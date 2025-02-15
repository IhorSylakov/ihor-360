import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Country } from '@/types/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
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

    const editedCountry: Partial<Country> = { name };
    if (description) editedCountry.description = description;
    if (visitDate) editedCountry.visitDate = visitDate;

    await adminDb.collection('users').doc(userId).collection('countries').doc(id).update(editedCountry);

    return NextResponse.json({ id: id, ...editedCountry });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при обновлении страны' }, { status: 500 });
  }
}
