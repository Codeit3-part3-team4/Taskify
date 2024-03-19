import DashboardInf from './DashboardInf';

interface DashboardCardProps {
  color: string;
  title: string;
  createdByMe: boolean;
}

export default function DashboardCard({ color, title, createdByMe }: DashboardCardProps) {
  return (
    <div className="flex">
      <DashboardInf color={color} title={title} createdByMe={createdByMe} />
    </div>
  );
}
