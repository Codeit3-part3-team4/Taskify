import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImageToServer = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('서버의 이미지 업로드 API 엔드포인트', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = await uploadImageToServer(file);
      if (imageUrl) {
        setImagePreview(imageUrl);
        onImageUpload(imageUrl);
      } else {
        setImagePreview(null);
        onImageUpload(null);
      }
    } else {
      setImagePreview(null);
      onImageUpload(null);
    }
  };

  return (
    <div>
      {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview cursor-pointer w-200 h-200" onClick={handleButtonClick} />}
      {!imagePreview && (
        <button onClick={handleButtonClick} className="btn">
          <img src="/images/add.svg" alt="Upload" />
        </button>
      )}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" style={{ display: 'none' }} />
    </div>
  );
};

export default ImageUpload;
