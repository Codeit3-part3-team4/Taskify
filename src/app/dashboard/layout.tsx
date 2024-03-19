import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import DashboardProvider from '@/context/DashboardContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardProvider>
        <div className="flex flex-row">
          <SideDashboardList />
          <div className="flex flex-col">
            <nav>네비게이션바</nav>
            {children}
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
