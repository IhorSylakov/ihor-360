import { useState, useEffect } from "react";

const GoogleDrive = () => {
  const [isGoogleDriveConnected, setGoogleDriveConnected] = useState<boolean | null>(null); // null - пока не знаем статус

  // Проверяем, подключён ли Google Drive при монтировании
  useEffect(() => {
    const fetchGoogleDriveStatus = async () => {
      try {
        const response = await fetch("/api/auth/googledrive/status");
        const data = await response.json();
        setGoogleDriveConnected(data.connected);
      } catch (error) {
        console.error("Ошибка при проверке Google Drive:", error);
        setGoogleDriveConnected(false);
      }
    };

    fetchGoogleDriveStatus();
  }, []);

  const connectGoogleDrive = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.file&access_type=offline&prompt=consent`;
    window.location.href = googleAuthUrl;
  };

  const disconnectGoogleDrive = async () => {
    const response = await fetch("/api/auth/googledrive/disconnect", { method: "POST" });

    if (response.ok) {
      setGoogleDriveConnected(false);
      alert("Google Drive отключен!");
    } else {
      alert("Ошибка при отключении Google Drive");
    }
  };

  if (isGoogleDriveConnected === null) {
    return <p>Загрузка...</p>; // Пока статус не получен, показываем загрузку
  }

  return (
    <div>
      {isGoogleDriveConnected ? (
        <button onClick={disconnectGoogleDrive} style={{ backgroundColor: "red", color: "white" }}>
          Отключить Google Drive
        </button>
      ) : (
        <button onClick={connectGoogleDrive}>
          Подключить Google Drive
        </button>
      )}
    </div>
  );
};

export default GoogleDrive;
