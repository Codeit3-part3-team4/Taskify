import React, { useState, useRef } from 'react';
import { uploadCardImage } from '@/api/columnApi';

interface ImageUploadProps {
  columnId: number;
  onImageUpload: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ columnId, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const data = await uploadCardImage(columnId, file);
        if (data && data.imageUrl) {
          onImageUpload(data.imageUrl);
        } else {
          throw new Error('Server did not return an image URL.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
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
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="image-preview cursor-pointer"
          style={{ width: '200px', height: '200px' }}
          onClick={handleButtonClick}
        />
      )}
      {!imagePreview && (
        <button onClick={handleButtonClick} className="btn">
          <img src="/images/add.svg" alt="Upload" />
        </button>
      )}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
    </div>
  );
};

export default ImageUpload;
