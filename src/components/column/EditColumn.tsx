import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '../hooks/useModal/useModal';
import { editColumnApi, deleteColumnApi } from '@/api/columnApi';

const EditColumn = ({ columnId, initialColumnName, onColumnUpdated, onColumnDeleted }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [columnName, setColumnName] = useState(initialColumnName);

  const handleInputChange = e => {
    setColumnName(e.target.value);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('컬럼의 모든 카드가 삭제됩니다. 계속하시겠습니까?');
    if (isConfirmed) {
      try {
        await deleteColumnApi(columnId);
        onColumnDeleted(columnId);
        closeModal();
        window.location.reload();
      } catch (error) {
        console.error('컬럼 삭제 실패:', error);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!columnName.trim()) {
      alert('컬럼 이름을 입력해주세요.');
      return;
    }

    try {
      await editColumnApi(columnId, columnName);
      onColumnUpdated(columnId, columnName);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('컬럼 수정 실패:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <img src="/images/settings.svg" alt="컬럼 관리 버튼 아이콘" />
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="컬럼 관리" showCloseButton={false}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="columnName" className="block font-bold text-sm mb-1">
                이름
              </label>
              <input
                id="columnName"
                className="input input-bordered w-full mb-3"
                type="text"
                value={columnName}
                onChange={handleInputChange}
                placeholder="제목을 수정해 주세요"
              />
            </div>
            <div className="relative flex justify-end space-x-2 mt-3">
              <button type="button" className="absolute left-2 bottom-2 text-xs text-gray-500 hover:underline" onClick={handleDelete}>
                삭제하기
              </button>
              <button type="button" className="btn w-32" onClick={closeModal}>
                취소
              </button>
              <button type="submit" className="btn w-32  bg-primary-BASIC text-white hover:bg-primary-BASIC hover:scale-105">
                변경
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default EditColumn;
