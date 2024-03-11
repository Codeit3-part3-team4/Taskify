import { getDashboardDetailsApi } from "@/api/dashboardsApi";

const getDashboardDetails = async () => {
  const dashboardId = 4570;
  return await getDashboardDetailsApi(dashboardId);
}

export default async function DashboardName() {
  const result = await getDashboardDetails();  

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <strong>{result.title}</strong>
        <div>{result.color}</div>
      </div>
      <div>대시보드 이름</div>
      <div className="w-full bg-gray-500/50">Input</div>
      <div className="flex flex-row justify-end">변경</div>
    </div>
  )
}