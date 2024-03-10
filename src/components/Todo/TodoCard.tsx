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
        <div className="absolute border p-3 w-200 h-155 top-20 right-4 gap-3">
          <div>담당자</div>
          <div>담당자 이름</div>
          <div>마감일</div>
          <div>마감 날짜</div>
        </div>
        <div className="gap-3">
          <div>태그</div>
          <div>설명</div>
          <div>이미지</div>
          <div>댓글</div>
        </div>
        <input
          className="input input-bordered w-full h-24 "
          type="text"
          placeholder="댓글 작성하기"
        ></input>
        <div>댓글모음</div>
        <Comment />
      </Modal>
    </div>
  );
}
