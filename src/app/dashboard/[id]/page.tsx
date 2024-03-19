'use client';

import { CardList, getCardListApi } from '@/api/cardApi';
import { ColumnList, getColumnListApi } from '@/api/columnApi';
import TodoForm from '@/components/Todo/TodoForm';
import Column from '@/components/column/Column';
import { useModal } from '@/components/hooks/useModal/useModal';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);
  const { setDashboardId } = useContext(DashboardContext);
  const { openModal } = useModal();

  setDashboardId(Number(id));

  useEffect(() => {
    async function fetchColumnData() {
      try {
        const result = await getColumnListApi(dashboardId);
        setColumnList(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchColumnData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {columnList?.map(column => <Column columnId={column.id} columnTitle={column.title} key={column.id} dashboardId={id} />)}
      <div className="flex w-80 md:w-594 lg:w-96 lg:h-1080 lg:px-4 pt-4 bg-gray-100 border border-slate-300">
        <div className="w-80 md:w-594 lg:w-96">
          <button
            className="flex w-72 md:w-537 lg:w-80 lg:h-16 items-center m-auto bg-white border border-slate-300 justify-center gap-3 pt-3 lg:mt-10 pb-3 mb-3 rounded-lg cursor-pointer"
            // onClick={openModal}
          >
            <div className="text-base font-bold">새로운 컬럼 추가하기</div>
            <Image src="/images/add.svg" width="20" height="20" alt="컬럼 추가하기 버튼 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 여기서 컬럼 리스트 불러와서 맵으로 뿌려주기
// 컬럼 페이지에서는 카드 리스트 뿌리고 이런 식으로

// 대시보드 페이지에 컬럼 합치기

// 상세 모달 누르면 안꺼지는데 <Modal><TodoCard /></Modal>
// 이런 식으로 영곤님이 만든거 참고해서 바꾸기

// api 파일에서 카드 겹치는 부분 따로 빼서 만들어주기

// 날짜 변환 함수 만들기
