'use client';

import { useUser } from '@/hooks/useUser';
import { AuthError } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, loading: userLoading } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }), // Передаём `identifier`, который может быть email или username
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Ошибка входа');
      }
      window.location.reload();
    } catch (error) {
      const firebaseError = error as AuthError;
      setError(firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading && user) {
      window.location.href = `/${user.username}`; // Теперь username доступен
    }
  }, [user, userLoading]);

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
