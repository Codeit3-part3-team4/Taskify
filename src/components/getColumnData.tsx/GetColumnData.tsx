'use client';

import { CardList, getCardListApi } from '@/api/getCardListApi';
import { ColumnList, getColumnListApi } from '@/api/getColumnListApi';
import React, { useEffect, useState } from 'react';
import Column from '../column/Column';

const GetColumnData = () => {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);
  const [cardList, setCardList] = useState<CardList | null>(null);

  console.log(columnList, cardList);
  useEffect(() => {
    async function fetchColumnCardData() {
      try {
        const ColumnResult = await getColumnListApi();
        setColumnList(ColumnResult.data);

        const cardResult = await getCardListApi();
        setCardList(cardResult);
      } catch (e) {
        console.log(e);
      }
    }
    fetchColumnCardData();
  }, []);

  return (
    <>
      {columnList && cardList && (
        <div>
          <Column columnList={columnList} cardList={cardList} />
        </div>
      )}
    </>
  );
};

export default GetColumnData;
