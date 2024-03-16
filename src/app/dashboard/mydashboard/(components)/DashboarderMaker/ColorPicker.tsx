import ColorSelectButton from './ColorSelectButton';

interface ColorPikerPorps {
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export default function ColorPicker({ setSelectedColor, selectedColor }: ColorPikerPorps) {
  return (
    <div>
      <ColorSelectButton color="#7AC555" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#760DDE" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#FFA500" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#76A5EA" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#E876EA" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
    </div>
  );
}
