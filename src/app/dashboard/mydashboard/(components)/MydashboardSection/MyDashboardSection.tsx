import DashboardList from './DashboardList';
import InvitationDashboard from '../InvitationDashboard/InvitationDashboard';

export default function MyDashboardSection() {
  return (
    <div className="max-w-screen-xl mx-5 md:mt-5">
      <DashboardList />
      <InvitationDashboard />
    </div>
  );
}
