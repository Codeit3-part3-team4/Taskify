import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '../hooks/useModal/useModal';
import { createColumnApi, getColumnListApi } from '@/api/columnApi';

interface AddColumnProps {
  dashboardId: number;
}

const AddColumn: React.FC<AddColumnProps> = ({ dashboardId }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [columnName, setColumnName] = useState('');
  const [columnCount, setColumnCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchColumnCount = async () => {
      try {
        const res = await getColumnListApi(dashboardId);
        if (res) {
          setColumnCount(res.length);
        }
      } catch (error) {
        console.error('Error fetching column count:', error);
      }
    };

    if (dashboardId) {
      fetchColumnCount();
    }
  }, [dashboardId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (columnCount >= 10) {
      setError('컬럼은 최대 10개까지 생성 가능합니다');
      return;
    }

    try {
      const response = await createColumnApi(columnName, dashboardId);
      if (response && response.id) {
        setColumnCount(prevCount => prevCount + 1);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  const isSubmitDisabled = !columnName.trim() || columnCount >= 10;

  return (
    <div>
      <button
        onClick={openModal}
        className="flex w-72 md:w-537 lg:w-80 lg:h-16 items-center m-auto bg-white border-2 border-slate-200 hover:border-primary-BASIC transition duration-500
          justify-center pt-3 lg:mt-10 pb-3 mb-3 rounded-lg cursor-pointer"
      >
        <div>
          <div className="flex w-full h-full gap-2">
            <div className="flex text-base font-bold">새로운 컬럼 추가하기</div>

            <img src="/images/add.svg" className="bg-violet-200 rounded-md" alt="컬럼 추가하기 버튼 아이콘" />
          </div>
        </div>
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="새 컬럼 생성" showCloseButton={false}>
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
                placeholder="제목을 입력해 주세요"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <button type="button" className="btn w-32" onClick={closeModal}>
                취소
              </button>
              <button type="submit" className="btn w-32 btn-primary" disabled={isSubmitDisabled}>
                생성
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddColumn;
