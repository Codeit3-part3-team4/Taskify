'use client';

import { deleteDashboardApi } from '@/api/dashboardsApi';

const deleteDashboard = async (id: string) => {
  return await deleteDashboardApi(Number(id));
};

export default function DashboardDelete({ dashboardId }: { dashboardId: string }) {
  const onClick = () => {
    deleteDashboard(dashboardId);
  };

  return (
    <div className="flex justify-center items-center w-full px-20 py-4 rounded border border-gray-D9D9D9 bg-white">
      <button onClick={onClick}>대시보드 삭제하기</button>
    </div>
  );
}
