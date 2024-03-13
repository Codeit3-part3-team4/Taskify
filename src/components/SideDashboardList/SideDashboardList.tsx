import AddDashboardButton from '@/app/dashboard/mydashboard/(components)/MydashboardSection/AddDashboardButton';
import DashboardCard from '@/app/dashboard/mydashboard/(components)/MydashboardSection/DashboardCard';
import { DashboardContext } from '@/context/dashboardContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import AddDashboardModal from '../Modal/AddDashboardModal';

export default function SideDashboardList() {
  const { data } = useContext(DashboardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (data === null) {
    return null;
  }
  return (
    <div className="flex flex-col mx-3 w-16 md:w-40 lg:w-64 ">
      <div className="flex flex justify-center mt-5 md:mb-14 mb-10">
        <div className="w-6 md:w-7">
          <Image
            src="/images/taskify-logo-light.svg"
            alt="로고"
            width={32}
            height={32}
          />
        </div>
        <div className="hidden md:block w-28">
          <Image src="/images/taskify.svg" alt="로고" width={80} height={24} />
        </div>
      </div>
      <div>
        <AddDashboardButton
          text="dash board"
          img="/images/add_box.svg"
          isModalOpen={setIsModalOpen}
          isSide
        />
      </div>
      <div className="flex flex-col">
        {data.dashboards.map(dashboard => (
          <div
            key={dashboard.id}
            className="flex justify-center md:justify-start"
          >
            <DashboardCard
              color={dashboard.color}
              title={dashboard.title}
              createdByMe={dashboard.createdByMe}
              IsSide
            />
          </div>
        ))}
      </div>
      <AddDashboardModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
