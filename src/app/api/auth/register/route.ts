import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    // Проверяем, есть ли уже такой username
    const existingUser = await adminDb.collection('users').where('username', '==', username).get();
    if (!existingUser.empty) {
      return NextResponse.json({ error: 'Username уже используется' }, { status: 400 });
    }

    // Создаём пользователя в Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
    });

    // Добавляем пользователя в Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      username,
    });

    // Получаем idToken через Firebase REST API
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || 'Ошибка входа' }, { status: 401 });
    }

    // Создаём session cookie
    const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 дней
    const sessionCookie = await adminAuth.createSessionCookie(data.idToken, { expiresIn });

    // Устанавливаем session cookie
    const cookieStore = await cookies(); // Теперь cookies() обрабатывается правильно
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Только в продакшене
      path: '/',
    });

    return NextResponse.json({ message: 'Регистрация успешна' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Ошибка регистрации' }, { status: 500 });
  }
}
