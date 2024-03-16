import DashboardList from './DashboardList';
import InvitationDashboard from '../InvitationDashboard/InvitationDashboard';

export default function MyDashboardSection() {
  return (
    <div className="mx-5">
      <DashboardList />
      <InvitationDashboard />
    </div>
  );
}
