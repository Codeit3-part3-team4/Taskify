import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Comment from '../Comment/Comment';
import TodoUpdate from './TodoUpdate';
import { useModal } from '../hooks/useModal/useModal';
import { deleteCardApi, detailCardApi } from '@/api/cardApi';

interface CardDetails {
  description: string;
  assignee: { nickname: string } | null;
  dueDate: string;
}

export default function TodoCard({ cardId, dashboardId, columnId, card, columnTitle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen: isUpdateModalOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal();
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);

  useEffect(() => {
    const loadCardDetails = async () => {
      try {
        const details = await detailCardApi(cardId);
        setCardDetails(details);
      } catch (error) {
        console.error('카드 상세 정보를 가져오는 데 실패했습니다.', error);
      }
    };
    loadCardDetails();
  }, [cardId]);

  console.log(cardDetails);

  const handleEditClick = async () => {
    try {
      const details = await detailCardApi(cardId);
      setCardDetails(details);
      openUpdateModal();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('카드 상세 정보를 가져오는 데 실패했습니다.', error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDeleteClick = async () => {
    if (window.confirm('이 카드를 삭제하시겠습니까?')) {
      try {
        await deleteCardApi(cardId);
        alert('카드가 삭제되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('카드 삭제 실패:', error);
      }
    }
  };

  return (
    <div>
      <button className="absolute btn btn-sm btn-circle btn-ghost top-6 right-12" onClick={toggleDropdown}>
        <img src="/images/kebab.svg" alt="Menu" />
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 top-12 right-12 bg-white shadow-md rounded">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer" onClick={handleEditClick}>
              수정하기
            </li>
            <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer" onClick={handleDeleteClick}>
              삭제하기
            </li>
          </ul>
        </div>
      )}

      <TodoUpdate
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        cardDetails={cardDetails}
        cardId={cardId}
        dashboardId={dashboardId}
        columnId={columnId}
      />
      <div className="flex flex-col relative gap-3 w-full">
        {cardDetails && (
          <>
            <div className="flex gap-5">
              <div className="bg-blue-500 text-blue-300 w-50 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3 md:mr-3.5">{columnTitle}</div>

              <div className="text-gray-300">|</div>
              <div className="bg-lime-100 text-lime-400 w-50 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3 md:mr-3.5">{card.tags}</div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="flex w-full p-5">{cardDetails.description}</div>
                <div className="flex w-full p-5">
                  {' '}
                  {cardDetails?.imageUrl && <Image src={cardDetails.imageUrl} alt="Card Image" width={500} height={300} layout="responsive" />}
                </div>
              </div>
              <div className="flex flex-col border p-2 gap-2 w-full h-full">
                <div className="text-m font-bold">담당자</div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full">{card.assignee.profileImageUrl}</div>
                  <div className="text-sm">{card.assignee.nickname}</div>
                </div>
                <div className="text-m font-bold">마감일</div>
                <div className="text-sm">{card.createdAt.slice(0, 16).replace('T', ' ')}</div>
              </div>
            </div>

            <Comment cardId={cardId} dashboardId={dashboardId} columnId={columnId} />
          </>
        )}
      </div>
    </div>
  );
}
