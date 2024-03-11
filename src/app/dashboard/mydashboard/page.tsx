import { getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import MyDashboardPage from './components/MydashboardSection/MyDashboardPage';

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export default async function MyDashboard() {
  const data = await getDashboardsByPaginationApi(1, 3000);
  return (
    <div>
      <MyDashboardPage initData={data} />
    </div>
  );
}
