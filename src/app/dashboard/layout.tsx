import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import DashboardProvider from '@/context/DashboardContext';
import DashboardHeader, { FunctionalHeader } from './(components)/DashboardHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const url = '/images/mokoko-bg.png';
  return (
    <>
      <DashboardProvider>
        <div className="flex flex-row">
          <SideDashboardList />
          <div className="flex flex-col  h-[calc(100dvh-2rem)] w-[calc(100dvw-5rem)] ml-20">
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
