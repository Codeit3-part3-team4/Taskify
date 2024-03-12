import Image from 'next/image';
import DashboardInf from './DashboardInf';

interface DashboardCardProps {
  color: string;
  title: string;
  createdByMe: boolean;
  IsSide?: boolean;
}

export default function DashboardCard({
  color,
  title,
  createdByMe,
  IsSide,
}: DashboardCardProps) {
  return (
    <div>
      <DashboardInf
        color={color}
        title={title}
        createdByMe={createdByMe}
        IsSide={IsSide}
      />
      {IsSide ? null : (
        <Image
          src="/images/arrow-forward-right-big.svg"
          alt="대시보드 이동하기"
          width={18}
          height={18}
        />
      )}
    </div>
  );
}
