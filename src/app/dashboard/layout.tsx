import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import DashboardProvider from '@/context/DashboardContext';
import DashboardHeader, { FunctionalHeader } from './(components)/DashboardHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardProvider>
        <div className="flex flex-row">
          <SideDashboardList />
          <div className="flex flex-col w-full ml-20">
            <DashboardHeader>
              <FunctionalHeader />
            </DashboardHeader>
            {children}
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
