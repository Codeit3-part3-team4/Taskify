'use client';
import { CardList } from '@/api/getCardListApi';

const GetCard = ({ card }: { card: Card }) => {
  function onClickCardDetail() {}

  return (
    <>
      <div
        className="flex flex-col gap-2.5"
        onClick={onClickCardDetail}
        key={card.id}
      >
        <div className="flex flex-col m-auto w-72 md:w-537 h-full bg-white items-center pt-3 pb-3 mb-3 rounded-lg border border-slate-300 cursor-pointer bg-red-100">
          <div className="md:flex md:m-auto md:gap-4">
            <img
              className="w-64 md:w-24"
              alt="Upload-image"
              // src={card.imageUrl ? card.imageUrl : '/images/image-test.png'}
              src="/images/image-test.png"
            />
            <div className="w-64 md:w-96 pt-3 md:pt-0 md:flex-row gap-y-3">
              <div className="text-sm font-medium leading-4 pb-1.5">
                {card.title}
              </div>
              <div className="md:flex md:items-center ">
                {/* <div> */}
                <div className="bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3 md:mr-3.5">
                  {card.tags}
                </div>
                {/* </div> */}
                <div className="flex w-64 md:w-full justify-between md:items-center">
                  <div className="flex w-16 gap-1 items-center pt-1.5 md:pt-0">
                    <img src="/images/calendar-icon.svg" alt="캘린더 아이콘" />
                    <div className="text-xs text-slate-400">
                      {/* {card.createdAt} */}
                      asd
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-6 h-6 bg-emerald-800 opacity-40 rounded-full text-white text-xs font-semibold">
                    {card.assignee.nickname[0].toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetCard;
