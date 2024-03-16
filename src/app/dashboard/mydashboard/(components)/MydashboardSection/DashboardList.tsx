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
  const { data } = useContext(DashboardContext);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (data === null) {
    return null;
  }

  const PAGE_SIZE = 7; // 페이지당 항목 수

  // 페이지네이션을 통해 보여줄 항목들을 추출
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, data.dashboards.length);
  const displayedDashboards = data.dashboards.slice(startIndex, endIndex);
  return (
    <div className="md:flex md:flex-col md:items-center">
      <div className="max-w-screen-xl flex flex-col gap-y-2 md:justify-center md:flex-row md:flex-wrap md:gap-4  ">
        <div className="flex items-center border border-gray_D9D9D9 rounded-lg h-14 md:w-72 md:h-20">
          <AddDashboardButton isModalOpen={setIsModalOpen}>
            <Image src="/images/plus-icon.svg" alt="대시보드 추가하기" width={16} height={16} />
          </AddDashboardButton>
        </div>
        {displayedDashboards.map(dashboard => (
          <div key={dashboard.id} className="flex items-center border border-gray_D9D9D9 rounded-lg h-14 md:w-72 md:h-20">
            <Link href={`/dashboard/${dashboard.id}`}>
              <DashboardCard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination count={data.totalCount} page={page} setPage={setPage} />
      <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
