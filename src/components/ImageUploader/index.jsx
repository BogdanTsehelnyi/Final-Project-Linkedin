import React, { useState } from "react";

export default function ImageUploader({ onUploadSuccess, onError }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);

    try {
      // Отримати підписану URL-адресу з API
      const response = await fetch("/api/get-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося отримати підписану URL-адресу");
      }

      const { url, key } = await response.json();

      // Завантажити файл до S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Не вдалося завантажити файл на S3");
      }

      setIsLoading(false);
      if (onUploadSuccess) onUploadSuccess(key); // `key` — це шлях до зображення на S3
    } catch (error) {
      setIsLoading(false);
      if (onError) onError(error.message);
    }
  };

  return (
    <div>
      <label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {isLoading ? "Завантаження..." : "Завантажити фото"}
      </label>
    </div>
  );
}
