import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const session = cookiesStore.get('session');
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Проверяем сессию в Firebase
    const decodedClaims = await adminAuth.verifySessionCookie(session.value, true);
    const userDoc = await adminDb.collection('users').doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user: userDoc.data() });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
