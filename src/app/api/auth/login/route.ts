import { NextRequest, NextResponse } from 'next/server';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { serialize } from 'cookie';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Поля не должны быть пустыми' }, { status: 400 });
    }

    const auth = getAuth();
    let email = identifier;
    let username = '';

    // Если введён username, найти email
    if (!identifier.includes('@')) {
      const q = query(collection(db, 'users'), where('username', '==', identifier));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return NextResponse.json({ error: 'Пользователь с таким username не найден' }, { status: 404 });
      }

      const userData = querySnapshot.docs[0].data();
      email = userData.email;
      username = userData.username;
    }

    // Аутентификация через Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Если username ещё не найден, получить его через email
    if (!username) {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        username = userData.username;
      }
    }

    if (!username) {
      throw new Error('Не удалось найти данные пользователя');
    }

    // Установка куки
    const cookie = serialize(
      'user',
      JSON.stringify({ uid: userCredential.user.uid, username }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 день
        path: '/',
      }
    );

    const response = NextResponse.json({ success: true, username });
    response.headers.append('Set-Cookie', cookie);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Ошибка при логине' },
      { status: 500 }
    );
  }
}
