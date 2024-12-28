'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function LogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { dispatch } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({type: 'CLEAR_USER'});
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <Link
          href={`/login`}
          style={{
            padding: '10px 20px',
            backgroundColor: 'lightgreen',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Выйти
      </button>
    </div>
  );
}
