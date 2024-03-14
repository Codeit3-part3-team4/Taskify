import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '../hooks/useModal/useModal';
import Comment from '../Comment/Comment';

export default function TodoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <button className="btn" onClick={openModal}>
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
        <button
          className="absolute btn btn-sm btn-circle btn-ghost top-6 right-12"
          onClick={toggleDropdown}
        >
          <img src="/images/kebab.svg" alt="Menu" />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 top-12 right-12 bg-white shadow-md rounded">
            <ul>
              <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer">
                수정하기
              </li>
              <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer">
                삭제하기
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-5">
            <img src="/images/test1.svg" alt="test1" />
            <div className="text-gray-300">|</div>
            <img src="/images/test2.svg" alt="test2" />
          </div>
          <div className="flex">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
              Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros,
              vel aliquet diam elit at leo.
            </div>

            <div className="flex flex-col border p-3 gap-3 w-96 h-40">
              <div className="font-bold">담당자</div>
              <div>하이요</div>
              <div className="font-bold">마감일</div>
              <div>2022.12.31 19:00</div>
            </div>
          </div>
          <div>
            <img src="/images/test3.svg" />
          </div>

          <Comment />
        </div>
      </Modal>
    </div>
  );
}
