import React, { useState, useRef, MouseEvent } from 'react';

interface ImageUploadProps {
  onImageUpload: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // HTMLInputElement 타입 지정

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
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
