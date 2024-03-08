'use client';
import React from 'react';

interface ModalProps {
  isOpen: boolean; // 모달이 열려 있는지 여부를 나타내는 상태
  onClose: () => void; // 모달을 닫을 때 호출될 함수
  title: string; // 모달의 제목
  children: React.ReactNode; // 모달 내부에 표시될 내용
  showCloseButton?: boolean; // 모달 오른쪽 상단에 닫기 버튼을 표시할지 여부
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <dialog className="modal" open>
        <div className="modal-box relative">
          {showCloseButton && (
            <button
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;