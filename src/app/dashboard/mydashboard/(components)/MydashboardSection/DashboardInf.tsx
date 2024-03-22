interface DashboardInfProps {
  color: string;
  title: string;
  createdByMe: boolean;
}

export default function DashboardInf({ color, title, createdByMe }: DashboardInfProps) {
  return (
    <div
      className="flex items-center w-full h-full border border-gray_D9D9D9 rounded-lg"
      style={{
        borderColor: `${color}`,
      }}
    >
      <div
        className="w-4 h-4 m-3"
        style={{
          backgroundColor: `${color}`,
          borderRadius: '50%',
        }}
      ></div>
      <div className="">{title}</div>
      {createdByMe && (
        <div className="">
          <img className="w-4 h-3" src="/images/crown-icon.svg" alt="내가 만든 대시보드" />
        </div>
      )}
    </div>
  );
}
