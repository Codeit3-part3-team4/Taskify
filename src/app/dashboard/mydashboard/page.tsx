import MyDashboardSection from './(components)/MydashboardSection/MyDashboardSection';

export default function MyDashboard() {
  return (
    <div className="w-full mt-24 h-[calc(100dvh-6rem)] overflow-scroll">
      <MyDashboardSection />
    </div>
  );
}
