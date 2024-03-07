import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/components/hooks/useModal/useModal';

export default function TodoForm() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button className="btn" onClick={openModal}>
        <img src="/images/add.svg" />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="할일 생성">
        <div>내용</div>
      </Modal>
    </div>
  );
}
