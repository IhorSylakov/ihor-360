import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useUser } from '@/context/UserContext';

export default function LogoutButton() {
  const { dispatch } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({type: 'CLEAR_USER'});
      sessionStorage.removeItem('user');

      window.location.href = '/login';
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          padding: '0',
          background: 'none',
          color: 'inherit',
          border: 'none',
          fontSize: 'inherit',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Выйти
      </button>
    </div>
  );
}
