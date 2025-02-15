export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
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
