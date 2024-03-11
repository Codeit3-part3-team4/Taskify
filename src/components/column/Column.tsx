'use client';
import React, { useEffect, useState } from 'react';
import { getColumnListApi, ColumnList } from '@/api/getColumnListApi';
import { CardList, getCardListApi } from '@/api/getCardListApi';

const GetColumn = () => {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);

  const [columnName, setColumnName] = useState<CardList | null>(null);

  useEffect(() => {
    async function getColumnList() {
      try {
        const result = await getColumnListApi();
        setColumnList(result.data);
        const cardLength = await getCardListApi();
        const columnIdList = [];
      } catch (e) {
        console.log(e);
      }
    }
    getColumnList();
  }, []);

  //   console.log(columnList?.map(item => item.title));

  function openAddCardModal() {}

  return (
    <>
      <div className="flex flex-col md:flex-row 2xl:flex-row">
        {columnList?.map((item, index) => (
          <div key={index} className="w-80 h-80 bg-gray-200 border-slate-700">
            <div className="mx-3">
              <div className="flex justify-between py-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/purple-dot.svg"
                    alt="보라색 점 아이콘"
                    className="w-2"
                  />
                  <div className="text-base font-bold">{item.title}</div>
                  <div className="w-5 h-5 text-sm py-1 px-1.5 bg-gray-300 rounded text-slate-500">
                    2
                  </div>
                </div>
                <img
                  src="/images/settings.svg"
                  alt="설정 아이콘"
                  className="cursor-pointer"
                />
              </div>
              <button
                className="flex justify-center items-center w-72 h-8 rounded-md bg-white"
                onClick={openAddCardModal}
              >
                <img
                  src="/images/add.svg"
                  className="bg-violet-200 rounded-md"
                  alt="카드 추가하기 버튼 아이콘"
                />
              </button>
              {/* <Card /> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GetColumn;
