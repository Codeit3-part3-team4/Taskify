'use client';

import { ColumnList, getColumnListApi } from '@/api/columnApi';
import AddColumn from '@/components/column/AddColumn';
import Column from '@/components/column/Column';
import { useModal } from '@/components/hooks/useModal/useModal';
import { DashboardContext } from '@/context/DashboardContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page({ params: { id } }: { params: { id: number } }) {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);
  const { setDashboardId, data, isLoading } = useContext(DashboardContext);
  const { openModal } = useModal();
  const router = useRouter();

  setDashboardId(Number(id));

  useEffect(() => {
    async function fetchColumnData() {
      try {
        const result = await getColumnListApi(id);
        if (result === null) {
          router.push('/dashboard/mydashboard');
        }
        setColumnList(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchColumnData();
  }, []);

  if (!data) {
    return (
      <button className="flex justify-center h-44 items-center">
        <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24" />
      </button>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {columnList?.map((column: { id: any; title: any }) => (
        <Column columnId={column.id} columnTitle={column.title} key={column.id} dashboardId={Number(id)} />
      ))}
      <div className="flex items-center w-80 md:w-594 lg:w-96 lg:h-1080 lg:px-4 pt-4 bg-gray-100 border border-slate-300">
        <div className="w-80 md:w-594 lg:w-96">
          <div
<<<<<<< HEAD
            className="flex w-72 md:w-537 lg:w-80 lg:h-16 items-center m-auto bg-white border-2 border-slate-100 hover:border-pink-E876EA transition duration-500  justify-center gap-3 pt-3 lg:mt-10 pb-3 mb-3 rounded-lg cursor-pointer"
=======
            className="flex w-72 md:w-537 lg:w-80 lg:h-16 items-center m-auto bg-white border-2 border-slate-200 hover:border-pink-E876EA transition duration-500  justify-center gap-3 pt-3 lg:mt-10 pb-3 mb-3 rounded-lg cursor-pointer"
>>>>>>> 7b721b0ecee3d592d234beb173d558854e9fa742
            onClick={openModal}
          >
            <button className="flex text-base font-bold">새로운 컬럼 추가하기</button>
            <AddColumn dashboardId={Number(id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
