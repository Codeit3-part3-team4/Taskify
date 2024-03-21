'use client';

import { useState } from 'react';
import TodoCard from '../Todo/TodoCard';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import React from 'react';

const GetCard = ({ card, dashboardId, columnId, columnTitle }: { card: Card }) => {
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
          className="md:flex-row w-72 md:w-537 lg:w-80 h-full bg-white mb-3 rounded-lg border-2 border-slate-200 hover:border-purple-760DDE transition duration-500 cursor-pointer"
          onClick={clickOpenModal}
        >
          <Modal
            isOpen={isOpen}
            onClose={() => {
              onCloseModal();
            }}
            title={card.title}
          >
            <TodoCard cardId={card.id} isOpen={isOpen} dashboardId={dashboardId} columnId={columnId} card={card} columnTitle={columnTitle} />
          </Modal>
          <div className="md:flex lg:flex-col w-full items-center">
            {card.imageUrl !== 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/asdasd.png' && card.imageUrl !== null && (
              <div
                className="w-260 md:w-28 lg:w-284 h-40 md:h-16 lg:h-32 md:ml-3 lg:ml-0 lg:pl-0 mt-3 ml-3 md:mt-0 lg:mt-4"
                style={{ overflow: 'hidden', position: 'relative' }}
              >
                <Image src={card.imageUrl} alt="Card Image" layout="fill" objectFit="cover" style={{ position: 'absolute' }} />
              </div>
            )}
            <div className="w-full pt-3 p-4 flex-col">
              <div>
                <div className="w-full text-sm font-medium leading-4 pb-1.5 inline-block truncate text-ellipsis">{card.title}</div>
              </div>
              <div className="md:flex lg:flex-col">
                <div className="lg:flex lg:justify-start">
                  <div className="bg-lime-100 text-lime-400 inline-block rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3 md:mr-3.5">
                    {card.tags}
                  </div>
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
