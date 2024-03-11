'use client';
import { addDashboradApi } from '@/api/dashboardsApi';
import { ReactElement, useState } from 'react';
import ColorPicker from './ColorPicker';
import DashboardNameInput from './DashboardNameInput';

export default function DashboardMaker(): ReactElement {
  const [dashboardName, setDashboardName] = useState('새로운 대시보드');
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const handleCreateDashboard = () => {
    addDashboradApi(dashboardName, selectedColor);
  };
  return (
    <div>
      <div>새로운 대시보드</div>
      <DashboardNameInput
        dashboardName={dashboardName}
        setDashboardName={setDashboardName}
      />
      <ColorPicker
        setSelectedColor={setSelectedColor}
        selectedColor={selectedColor}
      />
      <button
        className="btn"
        onClick={handleCreateDashboard}
        disabled={!dashboardName}
      >
        생성
      </button>
    </div>
  );
}
