interface DashboardNameInputProps {
  dashboardName: string;
  setDashboardName: (e: string) => void;
}

export default function DashboardNameInput({ dashboardName, setDashboardName }: DashboardNameInputProps) {
  return (
    <div>
      <h2>대시보드 이름</h2>
      <input type="text" placeholder="대시보드 이름을 적어주세요" value={dashboardName} onChange={e => setDashboardName(e.target.value)} />
    </div>
  );
}
