'use client';
import React, { useEffect, useState } from 'react';
import { getCardListApi, CardList } from '@/api/getCardListApi';

const GetCard = () => {
  const [cardList, setCardList] = useState<CardList | null>(null);

  useEffect(() => {
    async function getCardList() {
      try {
        const result = await getCardListApi();
        setCardList(result.cards);
        console.log(result.cards);
      } catch (e) {
        console.log(e);
      }
    }
    getCardList();
  }, []);

  function onClickCardDetail() {}

  return (
    <>
      {cardList?.map((item, index) => (
        <div className="flex flex-col gap-2.5" onClick={onClickCardDetail}>
          <div className="flex flex-col m-auto w-72 bg-white items-center pt-3 pb-3 mb-3 rounded-lg border-slate-300 cursor-pointer">
            <div>
              {/* {cardList?.imageUrl ? (
              <img
                className="w-64"
                alt="Upload-image"
                src={cardList.imageUrl}
              />
            ) : null} */}
              <img
                className="w-64"
                alt="Upload-image"
                src="/images/image-test.png"
              />
              <div className="w-64 pt-3">
                <div>
                  <div className="text-sm font-medium leading-4 pb-1.5">
                    {item.title}
                  </div>
                  <div className="bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3">
                    {item.tags}
                  </div>
                </div>
                <div className="flex w-64 justify-between">
                  <div className="flex w-16 gap-1 items-center pt-1.5">
                    <img src="/images/calendar-icon.svg" alt="캘린더 아이콘" />
                    <div className="text-xs text-slate-400">2022.12.31</div>
                  </div>
                  <div className="text-center items-center">
                    <div className="w-6 h-6 bg-emerald-800 opacity-40 rounded-full text-white text-xs font-semibold">
                      {item.assignee.nickname}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GetCard;
