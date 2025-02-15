import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { City } from '@/types/types';

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
    const cityId = id;

    const { name, description, visitDate, notes, imageUrl, countryId } = await req.json();

    if (!countryId || !name) {
      return NextResponse.json({ error: 'countryId и name обязательны' }, { status: 400 });
    }

    const editedCity: Partial<City> = { name };
    if (description) editedCity.description = description;
    if (visitDate) editedCity.visitDate = visitDate;
    if (notes) editedCity.notes = notes;
    if (imageUrl) editedCity.imageUrl = imageUrl;

    const cityRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .doc(cityId);

    await cityRef.update(editedCity);

    return NextResponse.json({ id: cityId, ...editedCity });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при обновлении города' }, { status: 500 });
  }
}
