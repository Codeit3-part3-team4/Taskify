'use client';

import { Dashboard } from '@/api/dashboardsApi';
import MyDashboardSection from './MyDashboardSection';
import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import { useState } from 'react';

interface MyDashboardPage {
  initData: {
    dashboards: Dashboard[];
    totalCount: number;
    cursorId: null | number;
  };
}

export default function MyDashboardPage({ initData }: MyDashboardPage) {
  const [data, setData] = useState(initData);

  return (
    <div>
      <SideDashboardList data={data} setData={setData} />
      <MyDashboardSection data={data} setData={setData} />
    </div>
  );
}
