'use client';

import { useState } from 'react';
import { AuthError, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const auth = getAuth();
      let email = identifier;
      let username = '';
      if (!identifier.includes('@')) {
        const q = query(collection(db, 'users'), where('username', '==', identifier));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          throw new Error('Пользователь с таким username не найден');
        }
        const userData = querySnapshot.docs[0].data();
        email = userData.email;
        username = userData.username;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // await signInWithEmailAndPassword(auth, email, password);
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

      dispatch({
        type: 'SET_USER',
        payload: {
          uid: userCredential.user.uid,
          username,
          email,
        },
      });
      window.location.href = `/${username}`;
    } catch (error) {
      const firebaseError = error as AuthError;
      setError(firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email или Username:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
