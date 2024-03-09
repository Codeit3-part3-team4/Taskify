'use client';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://sp-taskify-api.vercel.app';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';
// process.env.REACT_APP_TOKEN;

interface CardList {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export const getCardListApi = async () => {
  const res = await fetch(`${BASE_URL}/3-4/cards?size=10&columnId=15764`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  return res.json();
};

const Card = () => {
  const [cardList, setCardList] = useState<CardList | null>(null);

  useEffect(() => {
    async function getCardList() {
      try {
        const result = await getCardListApi();
        setCardList(result.cards[0]);
      } catch (e) {
        console.log(e);
      }
    }
    getCardList();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2.5'>
        <div className='flex flex-col m-auto w-72 bg-white items-center pt-3 pb-3 rounded-lg border-slate-300'>
          <div>
            {/* {cardList?.imageUrl ? (
              <img
                className="w-64"
                alt="Upload-image"
                src={cardList.imageUrl}
              />
            ) : null} */}
            <img
              className='w-64'
              alt='Upload-image'
              src='/images/upload-image.svg'
            />
            <div className='w-64 pt-3'>
              <div>
                <div className='text-sm font-medium leading-4 pb-1.5'>
                  {cardList?.title}
                </div>
                <div className='bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3'>
                  {cardList?.tags}
                </div>
              </div>
              <div className='flex w-64 justify-between'>
                <div className='flex w-16 gap-1 items-center pt-1.5'>
                  <img src='/images/calendar-icon.svg' alt='캘린더 아이콘' />
                  <div className='text-xs text-slate-400'>2022.12.31</div>
                </div>
                <div className='text-center items-center'>
                  <div className='w-6 h-6 bg-emerald-800 opacity-40 rounded-full text-white text-xs font-semibold'>
                    {cardList?.assignee.nickname}
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

export default Card;
