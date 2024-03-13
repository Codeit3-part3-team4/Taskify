import DashboardList from './DashboardList';
import InvitationDashboard from '../InvitationDashboard/InvitationDashboard';

export default function MyDashboardSection() {
  return (
    <div className="border">
      <DashboardList />
      <InvitationDashboard />
    </div>
  );
}
