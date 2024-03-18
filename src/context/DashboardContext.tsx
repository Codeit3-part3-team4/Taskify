'use client';

import { DashboardsInf, getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { createContext, useEffect, useState } from 'react';

interface DashboardContextType {
  data: DashboardsInf | null;
  setData: (data: DashboardsInf | null) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  data: null,
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardsInf | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  return <DashboardContext.Provider value={{ data, setData, isLoading, setIsLoading }}>{children}</DashboardContext.Provider>;
}
