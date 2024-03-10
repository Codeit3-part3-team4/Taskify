import { DashboardsInf } from '@/api/dashboardsApi';
import AddDashboardButton from '@/app/mydashboard/components/MydashboardSection/AddDashboardButton';
import DashboardCard from '@/app/mydashboard/components/MydashboardSection/DashboardCard';
import Image from 'next/image';

interface SideDashboardListProps {
  data: DashboardsInf;
  setData: (data: DashboardsInf) => void;
}

export default function SideDashboardList({ data }: SideDashboardListProps) {
  return (
    <div>
      <div>
        <div>
          <Image
            src="/images/taskify-logo-light.svg"
            alt="로고"
            width={33}
            height={33}
          />
        </div>
        <div>
          <Image src="/images/taskify.svg" alt="로고" width={33} height={33} />
        </div>
      </div>
      <div>
        <AddDashboardButton text="dash board" img="/images/add_box.svg" />
      </div>
      <div>
        {data.dashboards.map(dashboard => (
          <DashboardCard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </div>
    </div>
  );
}
