import { ColumnList } from '@/api/columnApi';
import GetCard from '../getCard/GetCard';
import { CardList } from '@/api/cardApi';
import Link from 'next/link';
import Image from 'next/image';

const Column = ({ columnList, cardList }: { columnList: ColumnList; cardList: CardList }) => {
  function openAddCardModal() {}
  function openAddColumnModal() {}

  return (
    <>
      <div className="flex flex-col md:flex-col lg:flex-row">
        {columnList.map(column => (
          <div className="w-80 md:w-594 lg:h-1080  bg-gray-100 border border-slate-300" key={column.id}>
            <div className="mx-3">
              <div className="flex justify-between py-4">
                <div className="flex items-center gap-2">
                  <img src="/images/purple-dot.svg" alt="보라색 점 아이콘" className="w-2" />
                  <div className="text-base font-bold">{column.title}</div>
                  <div className="flex w-5 h-5 text-sm py-1 px-1.5 bg-gray-200 rounded text-slate-500 items-center">
                    {cardList.cards.filter(card => card.columnId === column.id).length}
                  </div>
                </div>
                <img src="/images/settings.svg" alt="설정 아이콘" className="cursor-pointer" />
              </div>
              <button
                className="flex justify-center items-center w-72 md:w-537 h-8 m-auto rounded-md bg-white mb-5 border border-slate-300"
                onClick={openAddCardModal}
              >
                <img src="/images/add.svg" className="bg-violet-200 rounded-md" alt="카드 추가하기 버튼 아이콘" />
              </button>
              {cardList.cards
                .filter(card => card.columnId === column.id)
                .map(card => (
                  <div key={card.id}>
                    <GetCard card={card} />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div className="flex flex-row w-full h-full lg:h-1080 md:w-594 md:flex-col lg:flex-row lg:px-5 lg:pt-14 bg-gray-100 border border-slate-300">
          <Link
            href="/"
            className="flex w-72 md:w-537 m-auto bg-white border border-slate-300 justify-center gap-3 pt-3 pb-3 mb-3 rounded-lg cursor-pointer"
            onClick={openAddColumnModal}
          >
            <div className="text-base font-bold">새로운 컬럼 추가하기</div>
            <Image src="/images/add.svg" width="20" height="20" alt="컬럼 추가하기 버튼 아이콘" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Column;
