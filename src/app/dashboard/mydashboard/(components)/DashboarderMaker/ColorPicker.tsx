import { ChangeEvent } from 'react';

interface ColorPickerProps {
  setSelectedColor: (color: string) => void;
}

export default function ColorPicker({ setSelectedColor }: ColorPickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src="/images/color-picker-icon.svg"
        alt="Spoit Image"
        style={{ width: '30px', height: '30px', cursor: 'pointer' }}
        onClick={() => {
          const colorInput = document.getElementById('colorInput');
          if (colorInput) {
            colorInput.click();
          }
        }}
      />
      <input
        id="colorInput"
        type="color"
        value="#000000"
        onChange={handleChange}
        style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', opacity: 0, zIndex: -1 }}
      />
    </div>
  );
}
