import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';
import DashboardProvider from '@/context/DashboardContext';
import DashboardHeader, { FunctionalHeader } from './(components)/DashboardHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardProvider>
        <div className="flex flex-row">
          <SideDashboardList />
          <div className="flex flex-col w-full">
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

{
  /* <>
      <DashboardProvider>
        <div className="flex flex-row">
          <SideDashboardList />
          <div className="flex flex-col">
            <nav>네비게이션</nav>
            {children}
          </div>
        </div>
      </DashboardProvider>
    </> */
}
