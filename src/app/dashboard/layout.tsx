'use client';

import {
  DashboardsInf,
  getDashboardsByPaginationApi,
} from '@/api/dashboardsApi';
import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import { DashboardContext } from '@/context/DashboardContext';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardsInf | null>(null);
  useEffect(() => {
    const getDashboardData = async () => {
      const res = await getDashboardsByPaginationApi(1, 3000);
      setData(res);
    };
    getDashboardData();
  }, []);

  return (
    <>
      <nav>네비게이션바</nav>
      <DashboardContext.Provider value={{ data, setData }}>
        <div className="flex">
          <SideDashboardList />
          {children}
        </div>
      </DashboardContext.Provider>
    </>
  );
}
