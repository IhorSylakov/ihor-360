import { NextRequest, NextResponse } from 'next/server';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { serialize } from 'cookie';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();

    // Проверка уникальности username
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ error: 'Username уже используется' }, { status: 400 });
    }

    // Создание пользователя в Firebase Authentication
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Запись данных пользователя в Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      username,
    });

    // Установка куки
    const cookie = serialize(
      'user',
      JSON.stringify({ uid: user.uid, username }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 день
        path: '/',
      }
    );

    const response = NextResponse.json({ success: true });
    response.headers.append('Set-Cookie', cookie);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Ошибка при регистрации' },
      { status: 500 }
    );
  }
}
