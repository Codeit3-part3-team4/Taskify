'use client';

import { useContext, useState } from 'react';
import AddDashboardButton from './AddDashboardButton';
import DashboardCard from './DashboardCard';
import Pagination from './Pagination';
import { DashboardContext } from '@/context/dashboardContext';
import AddDashboardModal from '@/components/Modal/AddDashboardModal';

export default function DashboardList() {
  const { data } = useContext(DashboardContext);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (data === null) {
    return null;
  }

  const PAGE_SIZE = 5; // 페이지당 항목 수

  // 페이지네이션을 통해 보여줄 항목들을 추출
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, data.dashboards.length);
  const displayedDashboards = data.dashboards.slice(startIndex, endIndex);
  return (
    <div>
      <div>
        <AddDashboardButton
          text="새로운 대시보드"
          img="/images/plus-icon.svg"
          isModalOpen={setIsModalOpen}
        />
        {displayedDashboards.map(dashboard => (
          <DashboardCard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </div>
      <Pagination count={data?.totalCount} page={page} setPage={setPage} />
      <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
