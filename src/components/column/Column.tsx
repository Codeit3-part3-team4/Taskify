'use client';
import { ColumnList } from '@/api/columnApi';
import GetCard from '../getCard/GetCard';
import { CardList, getCardListApi } from '@/api/cardApi';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '../hooks/useModal/useModal';
import { useEffect, useState } from 'react';
import TodoForm from '../Todo/TodoForm';

const Column = ({ columnId, columnTitle, dashboardId }) => {
  const [cardList, setCardList] = useState<CardList | null>(null);

  console.log(cardList);
  useEffect(() => {
    async function fetchCardData() {
      try {
        const result = await getCardListApi(5, 10, columnId);
        // setCardList(result);
        console.log(result);
        setCardList(result);
        return result;
      } catch (e) {
        console.log(e);
      }
    }
    fetchCardData();
  }, []);

  return (
    <>
      <div className="w-80 md:w-594 lg:w-96 lg:h-1080  bg-gray-100 border border-slate-300" key={columnId}>
        <div className="mx-3">
          <div className="flex justify-between py-4">
            <div className="flex items-center gap-2">
              <img src="/images/purple-dot.svg" alt="보라색 점 아이콘" className="w-2" />
              <div className="text-base font-bold">{columnTitle}</div>
              <div className="flex w-5 h-5 text-sm py-1 px-1.5 bg-gray-200 rounded text-slate-500 items-center">{cardList?.totalCount}</div>
            </div>
            <img src="/images/settings.svg" alt="설정 아이콘" className="cursor-pointer" />
          </div>
          <div className="flex md: justify-center">
            <button
              className="flex justify-center items-center w-72 md:w-537 lg:w-80 h-8 md:h-10 rounded-md bg-white mb-5 border border-slate-300"
              // onClick={openModal}
            >
              <TodoForm dashboardId={dashboardId} columnId={columnId} />
            </button>
          </div>
          {cardList &&
            cardList?.cards
              // .filter(card => card.columnId === columnId)
              ?.map(card => (
                <div key={card.id}>
                  <GetCard card={card} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Column;

// {cardList &&
//   cardList?.cards
//     // .filter(card => card.columnId === columnId)
//     ?.map(card => (
//       <div key={card.id}>
//         <GetCard card={card} />
//       </div>
//     ))}
// <div className="flex flex-row w-80 md:w-594 lg:w-96 h-full lg:h-1080 md:flex-col lg:flex-row lg:px-4 pt-4 bg-gray-100 border border-slate-300">
//   <div className="w-80 md:w-594 lg:w-96">
//     <button
//       className="flex w-72 md:w-537 lg:w-80 lg:h-16 items-center m-auto bg-white border border-slate-300 justify-center gap-3 pt-3 lg:mt-10 pb-3 mb-3 rounded-lg cursor-pointer"
//       // onClick={openModal}
//     >
//       <div className="text-base font-bold">새로운 컬럼 추가하기</div>
//       <Image src="/images/add.svg" width="20" height="20" alt="컬럼 추가하기 버튼 아이콘" />
//     </button>
//   </div>
// </div>
