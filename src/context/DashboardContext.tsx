'use client';

import { DashboardsInf, getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { createContext, useEffect, useState } from 'react';

interface DashboardContextType {
  data: DashboardsInf | null;
  setData: (data: DashboardsInf | null) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  dashboardId: number;
  setDashboardId: (id: number) => void;
  refresh: boolean;
  setRefresh: (b: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  data: null,
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  dashboardId: NaN,
  setDashboardId: () => {},
  refresh: false,
  setRefresh: () => {},
});

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [dashboardId, setDashboardId] = useState<number>(NaN);
  const [data, setData] = useState<DashboardsInf | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getDashboardData = async () => {
      setIsLoading(true);
      try {
        const res = await getDashboardsByPaginationApi(1, 3000);
        setData(res);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getDashboardData();
  }, [refresh]);

  return (
    <DashboardContext.Provider value={{ data, setData, isLoading, setIsLoading, dashboardId, setDashboardId, refresh, setRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
}
