import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
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
          className="image-preview cursor-pointer w-200 h-200"
          onClick={handleButtonClick}
        />
      )}
      {!imagePreview && (
        <button onClick={handleButtonClick} className="btn">
          <img src="/images/add.svg" />
        </button>
      )}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" style={{ display: 'none' }} />
    </div>
  );
};

export default ImageUpload;
