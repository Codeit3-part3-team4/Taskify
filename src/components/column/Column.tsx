'use client';
import GetCard from '../getCard/GetCard';
import { CardList, getCardListApi } from '@/api/cardApi';
import { useEffect, useRef, useState } from 'react';
import TodoForm from '../Todo/TodoForm';
import { useModal } from '../hooks/useModal/useModal';
import EditColumn from './EditColumn';
import useIntersectionObserver from '@/components/hooks/useObserver/useIntersectionObserver';

const Column = ({ columnId, columnTitle, dashboardId }) => {
  const [cardList, setCardList] = useState<CardList | null>(null);
  const { openModal } = useModal;
  const [processedCards, setProcessedCards] = useState<CardList[]>([]);
  const [loading, setLoading] = useState(false);
  const cursorIdRef = useRef(null);
  const isClosedRef = useRef<boolean>(false);
  const hasNotNext = processedCards.length !== 0 && !cursorIdRef.current;

  const handleIntersection = async () => {
    setLoading(true);
    try {
      if (hasNotNext || loading) {
        return;
      }

      const { cards, cursorId } = await getCardListApi(5, cursorIdRef.current, columnId);
      cursorIdRef.current = cursorId;
      if (!cursorId) {
        isClosedRef.current = true;
      }
      setProcessedCards(prevCards => [...prevCards, ...cards]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const { sentinelRef } = useIntersectionObserver(handleIntersection);

  useEffect(() => {
    async function fetchCardData() {
      try {
        const result = await getCardListApi(10, cursorIdRef.current, columnId);
        setCardList(result);
        cursorIdRef.current = result.cursorId;
        return result;
      } catch (e) {
        console.log(e);
      }
    }
    fetchCardData();
  }, []);

  const onColumnUpdated = () => {};
  const onCloumnDeleted = () => {};

  return (
    <>
      <div className="w-80 md:w-594 lg:w-96 h-1080 bg-gray-100 border border-slate-300" key={columnId}>
        <div className="mx-3">
          <div className="flex justify-between py-4">
            <div className="flex items-center gap-2">
              <img src="/images/purple-dot.svg" alt="보라색 점 아이콘" className="w-2" />
              <div className="text-base font-bold">{columnTitle}</div>
              <div className="flex inline-block h-5 text-sm py-1 px-1.5 bg-gray-200 rounded text-slate-500 items-center">{cardList?.totalCount || 0}</div>
            </div>
            <EditColumn columnId={columnId} initialColumnName={columnTitle} onColumnUpdated={onColumnUpdated} onColumnDeleted={onCloumnDeleted} />
          </div>
          <div className="flex md: justify-center">
            <button
              className="flex justify-center items-center w-72 md:w-537 lg:w-80 h-8 md:h-10 rounded-md bg-white mb-5 border-2 border-slate-200 hover:border-purple-760DDE transition duration-500"
              onClick={openModal}
            >
              <TodoForm dashboardId={dashboardId} columnId={columnId} />
            </button>
          </div>
          {cardList &&
            cardList?.cards?.map(card => (
              <div key={card.id}>
                <GetCard card={card} dashboardId={dashboardId} columnId={columnId} columnTitle={columnTitle} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Column;
