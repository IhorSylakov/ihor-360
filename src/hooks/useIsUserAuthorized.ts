'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';

interface AuthorizationResult {
  isAuthorized: boolean;
  error: string | null;
  loading: boolean;
}

export function useIsUserAuthorized(): AuthorizationResult {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const [userUid, setUserUid] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      );
      const querySnapshot = await getDocs(q);
      setUserUid(querySnapshot.docs[0].data().uid);
    };
  
    fetchUserData();

    if (!currentUser) {
      setError('Вы не авторизованы.');
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    if (currentUser.uid !== userUid) {
      setError('Вы не можете видеть данные других пользователей.');
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    setIsAuthorized(true);
    setError(null);
    setLoading(false);
  }, [currentUser, userUid, username]);

  return { isAuthorized, error, loading };
}
