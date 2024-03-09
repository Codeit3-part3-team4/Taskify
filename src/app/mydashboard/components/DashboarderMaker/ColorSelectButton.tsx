interface ColorSelectButtonProps {
  color: string;
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export default function ColorSelectButton({
  color,
  setSelectedColor,
  selectedColor,
}: ColorSelectButtonProps) {
  return (
    <div
      onClick={() => setSelectedColor(color)}
      style={{
        backgroundColor: `${color}`,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: selectedColor === color ? '2px solid black' : 'none',
      }}
    ></div>
  );
}
