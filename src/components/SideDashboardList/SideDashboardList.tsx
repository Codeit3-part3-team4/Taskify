'use client';

import AddDashboardButton from '@/app/dashboard/mydashboard/(components)/MydashboardSection/AddDashboardButton';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import AddDashboardModal from '../Modal/AddDashboardModal';
import SideDashboardCard from './SideDashboardCard';
import Link from 'next/link';
import SideDashboardSkeleton from './SideDashboardSkeleton';

export default function SideDashboardList() {
  const { data, isLoading } = useContext(DashboardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!data && isLoading) {
    return <SideDashboardSkeleton />;
  }
  return (
    <div className="w-20">
      <div className="w-20 fixed flex flex-col h-screen overflow-y-auto items-center">
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
          {data &&
            data.dashboards?.map(dashboard => (
              <div key={dashboard.id} className="flex justify-center">
                <Link href={`/dashboard/${dashboard.id}`}>
                  <SideDashboardCard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
                </Link>
              </div>
            ))}
        </div>
        <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}
