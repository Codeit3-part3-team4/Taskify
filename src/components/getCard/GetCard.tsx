'use client';
import { CardList } from '@/api/cardApi';

const GetCard = ({ card }: { card: Card }) => {
  function onClickCardDetail() {}

  return (
    <>
      <div
        className="flex flex-col gap-2.5"
        onClick={onClickCardDetail}
        key={card.id}
      >
        <div className="flex flex-col m-auto w-72 h-full bg-white items-center pt-3 pb-3 mb-3 rounded-lg border border-slate-300 cursor-pointer bg-red-100">
          <div>
            <img
              className="w-64"
              alt="Upload-image"
              // src={card.imageUrl ? card.imageUrl : '/images/image-test.png'}
              src="/images/image-test.png"
            />
            <div className="w-64 pt-3">
              <div>
                <div className="text-sm font-medium leading-4 pb-1.5">
                  {card.title}
                </div>
                <div className="bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3">
                  {card.tags}
                </div>
              </div>
              <div className="flex w-64 justify-between">
                <div className="flex w-16 gap-1 items-center pt-1.5">
                  <img src="/images/calendar-icon.svg" alt="캘린더 아이콘" />
                  <div className="text-xs text-slate-400">{card.createdAt}</div>
                </div>
                <div className="flex justify-center items-center w-6 h-6 bg-emerald-800 opacity-40 rounded-full text-white text-xs font-semibold">
                  {card.assignee.nickname[0].toUpperCase()}
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
