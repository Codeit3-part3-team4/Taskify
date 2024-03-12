import Image from 'next/image';

interface DashboardInfProps {
  color: string;
  title: string;
  createdByMe: boolean;
  IsSide?: boolean;
}

export default function DashboardInf({
  color,
  title,
  createdByMe,
  IsSide,
}: DashboardInfProps) {
  return (
    <div
      className={`${IsSide ? 'flex items-center justify-center md:justify-normal w-10 h-10 md:w-32 md:h-11 lg:w-64 lg:h-11' : ''}`}
    >
      <div
        className={`${IsSide ? 'w-4 h-4 m-3' : ''}`}
        style={{
          backgroundColor: `${color}`,
          borderRadius: '50%',
        }}
      ></div>
      <div
        className={`${IsSide ? 'hidden md:block truncate text-base  w-8 md:w-24 lg:w-48' : ''}`}
      >
        {title}
      </div>
      {createdByMe && (
        <div className={`${IsSide ? 'hidden md:block m-1 w-5' : ''}`}>
          <Image
            className="w-4 h-3"
            src="/images/crown-icon.svg"
            alt="내가 만든 대시보드"
            width={20}
            height={16}
          />
        </div>
      )}
    </div>
  );
}
