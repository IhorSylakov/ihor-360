export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        throw new Error('Ошибка при выходе');
      }

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
