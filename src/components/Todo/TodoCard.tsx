import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/components/hooks/useModal/useModal';
import Comment from '@/components/Comment/Comment';
import TodoUpdate from './TodoUpdate';
import { detailCardApi } from '@/api/cardApi';

interface CardDetails {
  description: string;
  assignee: { nickname: string } | null;
  dueDate: string;
}

interface TodoCardProps {
  cardId: string;
}

export default function TodoCard({ cardId }: TodoCardProps): JSX.Element {
  const { isOpen, openModal, closeModal } = useModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
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

  const handleEditClick = () => {
    setUpdateModalOpen(true);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <button type="button" className="btn" onClick={openModal}>
        <img src="/images/add.svg" />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          setIsDropdownOpen(false);
        }}
        title="새로운 일정 관리 Taskify"
      >
        <button className="absolute btn btn-sm btn-circle btn-ghost top-6 right-12" onClick={toggleDropdown}>
          <img src="/images/kebab.svg" alt="Menu" />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 top-12 right-12 bg-white shadow-md rounded">
            <ul>
              <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer" onClick={handleEditClick}>
                수정하기
              </li>
              <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer">삭제하기</li>
            </ul>
          </div>
        )}
        {isUpdateModalOpen && <TodoUpdate closeModal={() => setUpdateModalOpen(false)} cardDetails={cardDetails} cardId={cardId} />}
        <div className="flex flex-col gap-3 w-full">
          {cardDetails && (
            <>
              <div className="flex gap-5">
                <img src="/images/test1.svg" alt="Test 1" />
                <div className="text-gray-300">|</div>
                <img src="/images/test2.svg" alt="Test 2" />
              </div>
              <div className="flex">
                <div>{cardDetails?.description}</div>
                <div className="flex flex-col border p-3 gap-3 w-96 h-40">
                  <div className="font-bold">담당자</div>
                  <div>{cardDetails?.assignee ? cardDetails.assignee.nickname : '할당되지 않음'}</div>
                  <div className="font-bold">마감일</div>
                  <div>{cardDetails?.dueDate}</div>
                </div>
              </div>
              <div>
                <img src="/images/test3.svg" alt="Test 3" />
              </div>
              <Comment />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
