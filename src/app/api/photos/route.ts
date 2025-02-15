import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { Photo } from '@/types/types';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const placeId = searchParams.get('placeId');

    if (!countryId || !cityId || !placeId) {
      return NextResponse.json({ error: 'countryId, cityId и placeId обязательны' }, { status: 400 });
    }

    const snapshot = await adminDb
      .collection('users')
      .doc(userId)
      .collection('countries')
      .doc(countryId)
      .collection('cities')
      .doc(cityId)
      .collection('places')
      .doc(placeId)
      .collection('photos')
      .get();

    const photos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(photos);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при получении списка фотографий' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) return NextResponse.json({ error: 'Неавторизован' }, { status: 401 });

    const decodedToken = await adminAuth.verifySessionCookie(session.value, true);
    const userId = decodedToken.uid;

    const { imageUrl, isHidden, isPano, name, description, previewUrl, order, countryId, cityId, placeId } = await req.json();

    if (!countryId || !cityId || !placeId || !imageUrl) {
      return NextResponse.json({ error: 'countryId, cityId, placeId и imageUrl обязательны' }, { status: 400 });
    }
    
    const newPhoto: Partial<Photo> = { imageUrl };
    if (description) newPhoto.description = description;
    if (name) newPhoto.name = name;
    if (previewUrl) newPhoto.previewUrl = previewUrl;
    if (isHidden) newPhoto.isHidden = isHidden;
    if (isPano) newPhoto.isPano = isPano;
    if (order) newPhoto.order = order;

    const docRef = await adminDb.collection('users').doc(userId).collection('countries').doc(countryId).collection('cities').doc(cityId).collection('places').doc(placeId).collection('photos').add(newPhoto);

    return NextResponse.json({ id: docRef.id, ...newPhoto });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка при добавлении фотографии' }, { status: 500 });
  }
}
