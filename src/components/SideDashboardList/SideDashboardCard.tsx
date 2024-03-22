interface SideDashboardCardProps {
  color: string;
  title: string;
  createdByMe: boolean;
}

export default function SideDashboardCard({ color, title, createdByMe }: SideDashboardCardProps) {
  return (
    <div className="relative">
      {createdByMe ? (
        <div className="absolute right-0">
          <img className="w-5 h-4" src="/images/crown-icon.svg" alt="내가 만든 대시보드" />
        </div>
      ) : null}
      <div
        className="transition-all rounded-3xl duration-300 hover:rounded w-14 h-14 text-xs flex items-center justify-center truncate text-white hover:font-bold hover:text-sm"
        style={{
          backgroundColor: `${color}`,
        }}
      >
        {title}
      </div>
    </div>
  );
}
