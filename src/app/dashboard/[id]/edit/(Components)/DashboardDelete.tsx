'use client';

import { deleteDashboardApi } from '@/api/dashboardsApi';
import Modal from '@/components/Modal/Modal';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';

const deleteDashboard = async (id: string) => {
  const result = await deleteDashboardApi(Number(id));
  if (result.status === 204) {
    alert(`삭제 완료`);
    return true;
  } else {
    alert(`${result.data.message}`);
    return false;
  }
};

export default function DashboardDelete({ dashboardId }: { dashboardId: string }) {
  const [showModal, setShowModal] = useState(false);
  const { refresh, setRefresh } = useContext(DashboardContext);
  const [isNoEnter, setIsNoEnter] = useState(false);
  const [isYesEnter, setIsYesEnter] = useState(false);
  const router = useRouter();

  const onClick = () => {
    deleteDashboard(dashboardId).then(res => {
      setShowModal(false);
      if (res) {
        setRefresh(!refresh);
        router.push('/dashboard/mydashboard');
      }
    });
  };

  return (
    <div className="flex flex-row justify-end">
      <div
        className="flex flex-row justify-center items-center w-1/4 py-4 rounded text-white bg-red-D6173A hover:scale-105 transition-all"
        onClick={() => setShowModal(true)}
      >
        <strong>대시보드 삭제하기</strong>
      </div>
      <Modal isOpen={showModal} title="대시보드 삭제" showCloseButton={false}>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <p className="mb-3">정말로 삭제하시겠습니까?</p>
            <Image className="animate-bounce" src="/images/mokoko-cry.png" alt="cry" width="36" height="36" />
          </div>
          <div className="flex flex-row p-3 gap-10">
            <div className="w-full" />
            <div className="flex flex-row gap-2 w-full">
              <button
                className="relative w-full border border-gray-D9D9D9 rounded px-5 py-2 hover:bg-gray-D9D9D9"
                onClick={() => setShowModal(false)}
                onMouseEnter={() => setIsNoEnter(true)}
                onMouseLeave={() => setIsNoEnter(false)}
              >
                아니요
                {isNoEnter && <Image className="absolute -top-14 animate-bounce" src="/images/mokoko-smile.png" alt="cry" width="62" height="62" />}
              </button>
              <button
                className="relative w-full bg-red-D6173A text-white border border-gray-D9D9D9 rounded px-5 py-2 hover:scale-105"
                onClick={onClick}
                onMouseEnter={() => setIsYesEnter(true)}
                onMouseLeave={() => setIsYesEnter(false)}
              >
                네{isYesEnter && <Image className="absolute -top-14 animate-bounce" src="/images/mokoko-stop2.png" alt="cry" width="52" height="52" />}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
