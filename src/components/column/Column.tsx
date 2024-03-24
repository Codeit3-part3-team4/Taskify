'use client';
import GetCard from '../getCard/GetCard';
import { Card, getCardListApi } from '../../api/cardApi';
import React, { useRef, useState } from 'react';
import TodoForm from '../Todo/TodoForm';
import EditColumn from './EditColumn';
import useIntersectionObserver from '../../components/hooks/useObserver/useIntersectionObserver';

interface ColumnProps {
  columnId: number;
  columnTitle: string;
  dashboardId: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, columnTitle, dashboardId }) => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const cursorIdRef = useRef(null);
  const isClosedRef = useRef<boolean>(false);
  const hasNotNext = cardList.length !== 0 && !cursorIdRef.current;

  const handleIntersection = async () => {
    setLoading(true);
    try {
      if (hasNotNext || loading) {
        return;
      }

      const { cards, totalCount, cursorId } = await getCardListApi(5, cursorIdRef.current, columnId);
      cursorIdRef.current = cursorId;
      if (!cursorId) {
        isClosedRef.current = true;
      }
      setCardList(prevCards => [...prevCards, ...cards]);
      setTotalCount(totalCount);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const { sentinelRef } = useIntersectionObserver(handleIntersection);

  return (
    <>
      <div className="w-80 md:w-594 lg:w-96 h-full bg-white/50 border border-slate-300" key={columnId}>
        <div className="mx-3 h-full">
          <div className="flex justify-between py-4">
            <div className="flex items-center gap-2">
              <img src="/images/purple-dot.svg" alt="파란색 점 아이콘" className="w-2" />
              <div className="text-base font-bold">{columnTitle}</div>
              <div className="flex h-5 text-sm py-1 px-1.5 bg-primary-BASIC rounded text-white items-center">{totalCount}</div>
            </div>
            <EditColumn columnId={columnId} initialColumnName={columnTitle} />
          </div>

          <div className="flex md: justify-center">
            <TodoForm dashboardId={dashboardId} columnId={columnId} />
          </div>
          <div className="h-[calc(100%-10rem)] overflow-y-scroll">
            {cardList.length > 0 &&
              cardList?.map((card: Card, index: number) => <GetCard card={card} dashboardId={dashboardId} columnId={columnId} columnTitle={columnTitle} />)}
            <div ref={sentinelRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Column;
