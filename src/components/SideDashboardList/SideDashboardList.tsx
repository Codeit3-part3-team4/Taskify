import AddDashboardButton from '@/app/dashboard/mydashboard/(components)/MydashboardSection/AddDashboardButton';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import AddDashboardModal from '../Modal/AddDashboardModal';
import SideDashboardCard from './SideDashboardCard';
import Link from 'next/link';

export default function SideDashboardList() {
  const { data } = useContext(DashboardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (data === null) {
    return (
      <div className="flex flex-col mx-3 w-16 items-center animate-pulse">
        <div className="flex justify-center mt-5 mb-2">
          <div className="">
            <Image src="/images/taskify-logo-light.svg" alt="로고" width={32} height={32} />
          </div>
        </div>
        <div>
          <AddDashboardButton isModalOpen={setIsModalOpen}>
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
  return (
    <div className="flex flex-col mx-3 w-16">
      <Link href="/dashboard/mydashboard">
        <div className="flex justify-center mt-5 mb-2">
          <div className="">
            <Image src="/images/taskify-logo-light.svg" alt="로고" width={32} height={32} />
          </div>
        </div>
      </Link>
      <div className="mb-2">
        <AddDashboardButton isModalOpen={setIsModalOpen}>
          <Image src="/images/add_box.svg" alt="대시보드 추가하기" width={32} height={32} />
        </AddDashboardButton>
      </div>
      <div className="flex flex-col gap-y-1">
        {data.dashboards.map(dashboard => (
          <div key={dashboard.id} className="flex justify-center">
            <Link href={`/dashboard/${dashboard.id}`}>
              <SideDashboardCard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
            </Link>
          </div>
        ))}
      </div>
      <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
