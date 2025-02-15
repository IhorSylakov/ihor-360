import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Photo } from '@/types/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;
    const photoId = id;

    const { countryId, cityId, placeId, imageUrl, isHidden, isPano, name, description, previewUrl, order } =
      await req.json();

    if (!countryId || !cityId || !placeId || !imageUrl) {
      return NextResponse.json({ error: 'countryId, cityId, placeId и imageUrl обязательны' }, { status: 400 });
    }
        
    const editedPhoto: Partial<Photo> = { imageUrl };
    if (description) editedPhoto.description = description;
    if (name) editedPhoto.name = name;
    if (previewUrl) editedPhoto.previewUrl = previewUrl;
    if (isHidden) editedPhoto.isHidden = isHidden;
    if (isPano) editedPhoto.isPano = isPano;
    if (order) editedPhoto.order = order;

    const photoRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .doc(cityId)
      .collection('places')
      .doc(placeId)
      .collection('photos')
      .doc(photoId);

    await photoRef.update(editedPhoto);

    return NextResponse.json({ id: photoId, ...editedPhoto });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при обновлении фотографии' }, { status: 500 });
  }
}
