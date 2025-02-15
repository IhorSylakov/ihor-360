import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Place } from '@/types/types';

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
    const placeId = id;

    const { countryId, cityId, name, description, visitDate, notes, imageUrl } = await req.json();

    if (!countryId || !cityId || !name) {
      return NextResponse.json({ error: 'countryId, cityId и name обязательны' }, { status: 400 });
    }
    
    const editedPlace: Partial<Place> = { name };
    if (description) editedPlace.description = description;
    if (visitDate) editedPlace.visitDate = visitDate;
    if (notes) editedPlace.notes = notes;
    if (imageUrl) editedPlace.imageUrl = imageUrl;

    const placeRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .doc(cityId)
      .collection('places')
      .doc(placeId);

    await placeRef.update(editedPlace);

    return NextResponse.json({ id: placeId, ...editedPlace });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при обновлении места' }, { status: 500 });
  }
}
