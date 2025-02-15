import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line prefer-const
    let { identifier, password } = await req.json(); // `identifier` может быть email или username

    // Если введён username, находим email в Firestore
    if (!identifier.includes('@')) {
      const userQuery = await adminDb.collection('users').where('username', '==', identifier).get();
      if (userQuery.empty) {
        return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
      }
      identifier = userQuery.docs[0].data().email; // Теперь `identifier` - это email
    }

    // Получаем idToken через Firebase REST API
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: identifier, password, returnSecureToken: true }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || 'Ошибка входа' }, { status: 401 });
    }

    // Создаём session cookie (на 7 дней)
    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(data.idToken, { expiresIn });

    // Устанавливаем session cookie
    const cookieStore = await cookies(); // Теперь cookies() обрабатывается правильно
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json({ message: 'Вход успешен' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Ошибка входа' }, { status: 401 });
  }
}
