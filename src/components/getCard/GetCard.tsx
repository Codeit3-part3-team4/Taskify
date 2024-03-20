'use client';

import { useState } from 'react';
import TodoCard from '../Todo/TodoCard';
import Modal from '../Modal/Modal';

const GetCard = ({ card }: { card: Card }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  console.log(card);

  return (
    <>
      <div className="flex flex-col" key={card.id}>
        <div
          className="flex flex-col md:flex-row m-auto w-72 md:w-537 lg:w-80 h-full bg-white items-center pt-3 pb-3 mb-3 rounded-lg border-2 border-slate-100 hover:border-purple-760DDE transition duration-500 cursor-pointer"
          onClick={clickOpenModal}
        >
          <Modal
            isOpen={isOpen}
            onClose={() => {
              onCloseModal();
            }}
            title="새로운 일정 관리 Taskify"
          >
            <TodoCard cardId={card.id} isOpen={isOpen} />
          </Modal>
          <div className="md:flex lg:flex-col w-full">
            {card.imageUrl !== 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/asdasd.png' && card.imageUrl !== null && (
              <div className="w-284 md:w-28 lg:w-284 h-40 md:h-16 lg:h-32 overflow-hidden md:pl-4">
                <img className="w-full h-full object-cover" src={card.imageUrl} alt="Card Image" />
              </div>
            )}
            <div className="w-full pt-3 p-4 flex-col">
              <div>
                <div className="text-sm font-medium leading-4 pb-1.5">{card.title}</div>
              </div>
              <div className="md:flex lg:flex-col">
                <div className="lg:flex lg:justify-start">
                  <div className="bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3 md:mr-3.5">{card.tags}</div>
                </div>
                <div className="flex w-64 md:w-full justify-between md:items-center">
                  <div className="flex w-full gap-1 items-center pt-1.5 md:pt-0">
                    <img src="/images/calendar-icon.svg" alt="캘린더 아이콘" />
                    <div className="text-xs text-slate-400">{card.createdAt.slice(0, 16).replace('T', ' ')}</div>
                  </div>
                  <div className="flex justify-center items-center w-6 h-6 bg-green-A3C4A2 rounded-full text-white text-xs font-semibold">
                    {card.assignee.nickname[0].toUpperCase()}
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

export default GetCard;
