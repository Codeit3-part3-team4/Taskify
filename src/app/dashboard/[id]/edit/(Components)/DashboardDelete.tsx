'use client';

import { deleteDashboardApi } from '@/api/dashboardsApi';
import Modal from '@/components/Modal/Modal';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardContext } from '@/context/DashboardContext';

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
    <div>
      <div className="flex justify-center items-center w-full px-20 py-4 rounded border border-gray-D9D9D9 bg-white">
        <button onClick={() => setShowModal(true)}>대시보드 삭제하기</button>
      </div>
      <Modal isOpen={showModal} title="대시보드 삭제" showCloseButton={false}>
        <div className="flex flex-col">
          <p className="mb-5">정말로 삭제하시겠습니까?</p>
          <div className="flex flex-row p-3 gap-10">
            <button className="w-full border border-gray-D9D9D9 rounded px-5 py-2 hover:bg-gray-D9D9D9" onClick={() => setShowModal(false)}>
              아니요
            </button>
            <button className="w-full border border-gray-D9D9D9 rounded px-5 py-2 hover:bg-gray-D9D9D9" onClick={onClick}>
              네
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
