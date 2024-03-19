import React, { useState, useEffect, useContext } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '../hooks/useModal/useModal';
import { createColumnApi, getColumnListApi } from '@/api/columnApi';
import { DashboardContext } from '@/context/DashboardContext';

const AddColumn = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [columnName, setColumnName] = useState('');
  const [columnCount, setColumnCount] = useState(0);
  const [error, setError] = useState('');

  const { data: dashboardData } = useContext(DashboardContext);

  const dashboardId = dashboardData?.id;
  console.log('dashboardId:', dashboardId, 'Type:', typeof dashboardId);
  useEffect(() => {
    if (!dashboardId) return;

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

    fetchColumnCount();
  }, [dashboardId]);

  const handleInputChange = e => {
    setColumnName(e.target.value);
  };

  const handleSubmit = async e => {
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
      }
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  const isSubmitDisabled = !columnName.trim() || columnCount >= 10;

  return (
    <div>
      <button onClick={openModal}>
        <img src="/images/add.svg" className="bg-violet-200 rounded-md" alt="컬럼 추가하기 버튼 아이콘" />
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
