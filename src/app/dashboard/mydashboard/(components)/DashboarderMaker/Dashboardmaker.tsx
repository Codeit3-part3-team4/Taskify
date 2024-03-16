import { addDashboardApi, getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { ReactElement, useContext, useState } from 'react';
import ColorPicker from './ColorPicker';
import DashboardNameInput from './DashboardNameInput';
import { DashboardContext } from '@/context/DashboardContext';

interface DashboardMakerProps {
  setIsModalOpen: (b: boolean) => void;
}

export default function DashboardMaker({ setIsModalOpen }: DashboardMakerProps): ReactElement {
  const [dashboardName, setDashboardName] = useState('뉴프로젝트');
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const { setData } = useContext(DashboardContext);
  const handleCreateDashboard = async () => {
    const res = await addDashboardApi(dashboardName, selectedColor);
    if (res.status === 201) {
      const data = await getDashboardsByPaginationApi(1, 3000);
      setData(data);
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      <DashboardNameInput dashboardName={dashboardName} setDashboardName={setDashboardName} />
      <ColorPicker setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <button className="btn" onClick={handleCreateDashboard} disabled={!dashboardName}>
        생성
      </button>
    </div>
  );
}
