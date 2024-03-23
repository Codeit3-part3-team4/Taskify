'use client';

import { useContext, useState } from 'react';
import AddDashboardButton from './AddDashboardButton';
import DashboardCard from './DashboardCard';
import Pagination from './Pagination';
import AddDashboardModal from '@/components/Modal/AddDashboardModal';
import { DashboardContext } from '@/context/DashboardContext';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardList() {
  const { data, isLoading } = useContext(DashboardContext);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data && isLoading) {
    return (
      <div className="flex justify-center h-44 items-center">
        <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24" />
      </div>
    );
  }

  const PAGE_SIZE = 7; // 페이지당 항목 수

  // 페이지네이션을 통해 보여줄 항목들을 추출
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = data ? Math.min(startIndex + PAGE_SIZE, data.dashboards.length) : 0;
  const displayedDashboards = data ? data.dashboards.slice(startIndex, endIndex) : null;
  return (
    <div className="bg-white/50 md:flex md:flex-col p-5">
      <h2 className="flex items-start text-xl mb-5">대시보드</h2>
      <div className="flex flex-col gap-y-2 md:justify-center md:flex-row md:flex-wrap md:gap-4 my-4 ">
        <div className="flex items-center border border-gray_D9D9D9 rounded-lg h-14 md:w-72 md:h-20 bg-white hover:bg-gray-D9D9D9 shadow-lg">
          <AddDashboardButton isModalOpen={setIsModalOpen}>
            <Image src="/images/plus-icon.svg" alt="대시보드 추가하기" width={16} height={16} />
          </AddDashboardButton>
        </div>
        {displayedDashboards &&
          displayedDashboards.map(dashboard => (
            <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
              <div className="flex items-center border border-gray_D9D9D9 rounded-lg h-14 md:w-72 md:h-20 bg-white hover:bg-gray-D9D9D9 duration-300 hover:-translate-y-2 shadow-lg">
                <DashboardCard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
              </div>
            </Link>
          ))}
      </div>
      <div className="mb-4 flex justify-end w-full">
        <Pagination count={data?.totalCount || 0} page={page} setPage={setPage} />
      </div>
      <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
