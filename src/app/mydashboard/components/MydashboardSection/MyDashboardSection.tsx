import { DashboardsInf } from '@/api/dashboardsApi';
import DashboardList from './DashboardList';
import InvitationDashboard from '../InvitationDashboard/InvitationDashboard';

interface MydashboardProps {
  data: DashboardsInf;
  setData: (data: DashboardsInf) => void;
}

export default function MyDashboardSection({
  data,
  setData,
}: MydashboardProps) {
  return (
    <div>
      <DashboardList data={data} />
      <InvitationDashboard setData={setData} />
    </div>
  );
}
