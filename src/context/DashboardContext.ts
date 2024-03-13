import { DashboardsInf } from '@/api/dashboardsApi';
import { createContext } from 'react';

interface DashboardContextType {
  data: DashboardsInf | null;
  setData: (data: DashboardsInf | null) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  data: null,
  setData: () => {},
});
