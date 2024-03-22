'use client';

import AddDashboardButton from '@/app/dashboard/mydashboard/(components)/MydashboardSection/AddDashboardButton';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import AddDashboardModal from '../Modal/AddDashboardModal';
import Link from 'next/link';
import SideDashboardSkeleton from './SideDashboardSkeleton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableDashboardCard from './DraggableDashboardCard';

export default function SideDashboardList() {
  const { data, isLoading, setData } = useContext(DashboardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data && isLoading) {
    return <SideDashboardSkeleton />;
  }

  // 항목 재배치 함수
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = data?.dashboards[dragIndex];
    const reorderedData = data ? [...data.dashboards] : [];
    reorderedData.splice(dragIndex, 1);
    if (draggedItem) {
      reorderedData.splice(hoverIndex, 0, draggedItem);
    }
    setData({
      dashboards: reorderedData,
      totalCount: reorderedData.length,
      cursorId: null,
    });
  };

  return (
    <div className="">
      <div className="w-20 fixed z-10 flex flex-col h-screen overflow-y-auto items-center bg-gray-300/50">
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
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col gap-y-1">
            {data &&
              data.dashboards?.map((dashboard, index) => (
                <div key={dashboard.id} className="flex justify-center">
                  <Link href={`/dashboard/${dashboard.id}`}>
                    <DraggableDashboardCard
                      index={index}
                      id={dashboard.id}
                      color={dashboard.color}
                      title={dashboard.title}
                      createdByMe={dashboard.createdByMe}
                      moveItem={moveItem}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </DndProvider>
        <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}
