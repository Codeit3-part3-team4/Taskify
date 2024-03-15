'use client';

import { CardList, getCardListApi } from '@/api/cardApi';
import { ColumnList, getColumnListApi } from '@/api/columnApi';
import React, { useEffect, useState } from 'react';
import Column from '../column/Column';

const getColumnData = () => {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);
  const [cardList, setCardList] = useState<CardList | null>(null);

  useEffect(() => {
    async function fetchColumnCardData() {
      try {
        const ColumnResult = await getColumnListApi();
        setColumnList(ColumnResult.data);

        const cardResult = await getCardListApi();
        setCardList(cardResult.cards);
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

export default getColumnData;
