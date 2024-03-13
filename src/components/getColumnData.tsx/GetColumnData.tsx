'use client';

import { CardList, getCardListApi } from '@/api/getCardListApi';
import { ColumnList, getColumnListApi } from '@/api/getColumnListApi';
import React, { useEffect, useState } from 'react';
import Column from '../column/Column';
import GetCard from '../getCard/GetCard';

const getColumnData = () => {
  const [columnList, setColumnList] = useState<ColumnList | null>(null);
  const [cardList, setCardList] = useState<CardList | null>(null);

  useEffect(() => {
    async function fetchColumnCardData() {
      try {
        const ColumnResult = await getColumnListApi();
        setColumnList(ColumnResult.data);
        // setColumnList([...result.data].map(item => item.id));
        // console.log([...ColumnResult.data].map(item => item.id));

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
          {/* <GetCard cardList={cardList} /> */}
        </div>
      )}
    </>
  );
};

export default getColumnData;
