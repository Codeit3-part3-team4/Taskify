import Image from 'next/image';

interface DashboardInfProps {
  color: string;
  title: string;
  createdByMe: boolean;
}

export default function DashboardInf({
  color,
  title,
  createdByMe,
}: DashboardInfProps) {
  return (
    <div>
      <div
        style={{
          backgroundColor: `${color}`,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
        }}
      ></div>
      <div>{title}</div>
      {createdByMe && (
        <Image
          src="/images/crown-icon.svg"
          alt="내가 만든 대시보드"
          width={20}
          height={16}
        />
      )}
    </div>
  );
}
