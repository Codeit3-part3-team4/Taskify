import AddDashboardButton from '@/app/dashboard/mydashboard/(components)/MydashboardSection/AddDashboardButton';
import Image from 'next/image';

export default function SideDashboardSkeleton() {
  return (
    <div className="fixed flex flex-col mx-3 items-center animate-pulse">
      <div className="flex justify-center mt-5 mb-2">
        <div className="">
          <Image src="/images/taskify-logo-light.svg" alt="로고" width={32} height={32} />
        </div>
      </div>
      <div className="mb-2">
        <AddDashboardButton isModalOpen={() => {}}>
          <Image src="/images/add_box.svg" alt="대시보드 추가하기" width={32} height={32} />
        </AddDashboardButton>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
        <div className=" bg-slate-100 rounded-full w-14 h-14" />
      </div>
    </div>
  );
}
