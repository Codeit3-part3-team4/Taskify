import { ColumnList } from '@/api/getColumnListApi';
import GetCard from '../getCard/GetCard';
import { CardList } from '@/api/getCardListApi';

const Column = ({
  columnList,
  cardList,
}: {
  columnList: ColumnList;
  cardList: CardList;
}) => {
  function openAddCardModal() {}

  return (
    <>
      <div className="flex flex-col md:flex-col lg:flex-row">
        {columnList.map(column => (
          <div
            className="w-80 h-full bg-gray-100 border-slate-700"
            key={column.id}
          >
            <div className="mx-3">
              <div className="flex justify-between py-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/purple-dot.svg"
                    alt="보라색 점 아이콘"
                    className="w-2"
                  />
                  <div className="text-base font-bold">{column.title}</div>
                  <div className="flex w-5 h-5 text-sm py-1 px-1.5 bg-gray-200 rounded text-slate-500 items-center">
                    {
                      cardList.filter(card => card.columnId === column.id)
                        .length
                    }
                  </div>
                </div>
                <img
                  src="/images/settings.svg"
                  alt="설정 아이콘"
                  className="cursor-pointer"
                />
              </div>
              <button
                className="flex justify-center items-center w-72 h-8 rounded-md bg-white mb-5"
                onClick={openAddCardModal}
              >
                <img
                  src="/images/add.svg"
                  className="bg-violet-200 rounded-md"
                  alt="카드 추가하기 버튼 아이콘"
                />
              </button>
              {cardList
                .filter(card => card.columnId === column.id)
                .map(card => (
                  <div key={card.id}>
                    <GetCard card={card} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Column;
