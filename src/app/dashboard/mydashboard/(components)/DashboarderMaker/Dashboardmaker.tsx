import { addDashboardApi, getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { ReactElement, useContext, useState } from 'react';
import ColorSamples from './ColorSamples';
import DashboardNameInput from './DashboardNameInput';
import { DashboardContext } from '@/context/DashboardContext';
import ColorPicker from './ColorPicker';

interface DashboardMakerProps {
  setIsModalOpen: (b: boolean) => void;
  closeModal: () => void;
}

export default function DashboardMaker({ setIsModalOpen, closeModal }: DashboardMakerProps): ReactElement {
  const [dashboardName, setDashboardName] = useState('뉴프로젝트');
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const { setData } = useContext(DashboardContext);
  const handleCreateDashboard = async () => {
    const res = await addDashboardApi(dashboardName, selectedColor);
    if (res) {
      const data = await getDashboardsByPaginationApi(1, 3000);
      setData(data);
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      <div className="mb-3">
        <DashboardNameInput dashboardName={dashboardName} setDashboardName={setDashboardName} />
      </div>
      <div className="w-full flex justify-center mb-3">
        <div
          className="flex items-center justify-center text-white"
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: selectedColor,
            border: '1px solid #ccc',
            marginBottom: '10px',
            borderRadius: '50%',
          }}
        >
          {dashboardName}
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <ColorSamples setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
        <ColorPicker setSelectedColor={setSelectedColor} />
      </div>
      <div className="flex justify-end gap-3">
        <button
          className="flex items-center justify-center w-32 h-12 px-11 py-3.5 border rounded-lg text-purple-760DDE  hover:bg-gray-D9D9D9"
          onClick={closeModal}
          disabled={!dashboardName}
        >
          취소
        </button>
        <button
          className="flex items-center justify-center w-32 h-12 px-11 py-3.5 border rounded-lg bg-purple-760DDE text-white hover:bg-violet-5534DA"
          onClick={handleCreateDashboard}
        >
          생성
        </button>
      </div>
    </div>
  );
}
