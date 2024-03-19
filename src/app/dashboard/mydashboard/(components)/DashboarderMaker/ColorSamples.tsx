import ColorSelectButton from './ColorSelectButton';

interface ColorPikerPorps {
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export default function ColorSamples({ setSelectedColor, selectedColor }: ColorPikerPorps) {
  return (
    <div className="flex gap-2">
      <ColorSelectButton color="#7AC555" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#760DDE" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#FFA500" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#76A5EA" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <ColorSelectButton color="#E876EA" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
    </div>
  );
}
