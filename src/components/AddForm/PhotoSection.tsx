import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/types/types";

interface PhotoSectionProps {
  countryId: string;
  cityId: string;
  placeId: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ countryId, cityId, placeId }) => {
  const [photosLength, setPhotosLength] = useState<number>(0);
  const [newPhoto, setNewPhoto] = useState<Photo>({
    imageUrl: "",
    isHidden: false,
    isPano: true,
    name: "",
    description: "",
    previewUrl: "",
    order: 0,
  });
  const [uploadMethod, setUploadMethod] = useState<"cloudinary" | "manual" | "googleDrive">("googleDrive");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPhotosCount = async () => {
      try {
        const res = await fetch(`/api/photos?countryId=${countryId}&cityId=${cityId}&placeId=${placeId}`);
        if (!res.ok) throw new Error("Ошибка при загрузке количества фотографий");
        const data = await res.json();
        await console.log(data)
        await setPhotosLength(data.length);
      } catch (error) {
        console.error(error);
        setError("Ошибка при загрузке фотографий.");
      }
    };

    fetchPhotosCount();
  }, [countryId, cityId, placeId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      let uploadUrl = "";

      if (uploadMethod === "cloudinary") {
        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
          uploadUrl = data.url;
        } else {
          throw new Error(data.error?.message || "Ошибка при загрузке на Cloudinary.");
        }
      } else if (uploadMethod === "googleDrive") {
        const response = await fetch("/api/auth/googledrive/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
          uploadUrl = data.imageUrl;
        } else {
          throw new Error(data.error?.message || "Ошибка при загрузке на Google Drive.");
        }
      }

      setNewPhoto({ ...newPhoto, imageUrl: uploadUrl });
    } catch (error) {
      console.error(error);
      setError("Ошибка при загрузке изображения.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async () => {
    setError("");

    if (!newPhoto.imageUrl) {
      setError("Ссылка на изображение обязательна.");
      return;
    }

    try {
      const nextOrder = photosLength + 1;
      const photoData = { ...newPhoto, placeId, order: nextOrder, countryId, cityId };

      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoData),
      });

      if (!res.ok) throw new Error("Ошибка при добавлении фото");

      setNewPhoto({
        imageUrl: "",
        isHidden: false,
        isPano: true,
        name: "",
        description: "",
        previewUrl: "",
        order: 0,
      });
      setPhotosLength(nextOrder);

      // Очистка инпута после добавления фото
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImage(null); // Очищаем состояние файла
    } catch (error) {
      console.error(error);
      setError("Ошибка при добавлении фотографии.");
    }
  };

  return (
    <div>
      <h2>Добавить новое фото</h2>

      <div>
        <label>
          <input
            type="radio"
            value="googleDrive"
            checked={uploadMethod === "googleDrive"}
            onChange={() => setUploadMethod("googleDrive")}
          />
          Загрузить в Google Drive
        </label>
        <label>
          <input
            type="radio"
            value="cloudinary"
            checked={uploadMethod === "cloudinary"}
            onChange={() => setUploadMethod("cloudinary")}
          />
          Загрузить на Cloudinary
        </label>
        <label>
          <input
            type="radio"
            value="manual"
            checked={uploadMethod === "manual"}
            onChange={() => setUploadMethod("manual")}
          />
          Вставить URL вручную
        </label>
      </div>

      <div>
        {newPhoto.imageUrl && (
          <Image width={100} height={30} style={{ objectFit: "cover" }} alt="" src={newPhoto.imageUrl} />
        )}
        {uploadMethod === "manual" ? (
          <div>
            <input
              type="text"
              placeholder="Введите URL изображения"
              value={newPhoto.imageUrl}
              onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
            />
          </div>
        ) : (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={loading}
            />
            <button onClick={handleUpload} disabled={loading}>Загрузить</button>
            {loading && <p>Загрузка...</p>}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={newPhoto.isHidden}
            onChange={(e) => setNewPhoto({ ...newPhoto, isHidden: e.target.checked })}
          />
          Скрыть фото
        </label>
        <label>
          <input
            type="checkbox"
            checked={newPhoto.isPano}
            onChange={(e) => setNewPhoto({ ...newPhoto, isPano: e.target.checked })}
          />
          Панорамное фото?
        </label>
        <input
          type="text"
          placeholder="Название (необязательно)"
          value={newPhoto.name}
          onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={newPhoto.description}
          onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ссылка на превью (необязательно)"
          value={newPhoto.previewUrl}
          onChange={(e) => setNewPhoto({ ...newPhoto, previewUrl: e.target.value })}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={handleAddPhoto}
          disabled={!newPhoto.imageUrl && loading}
        >
          Добавить фото
        </button>
      </div>
    </div>
  );
};

export default PhotoSection;
