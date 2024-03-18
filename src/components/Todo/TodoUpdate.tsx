import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import ImageUpload from '../ImageUpload/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMembersApi } from '@/api/membersApi';
import { getColumnListApi } from '@/api/columnApi';
import { editCardApi } from '@/api/cardApi';

interface CardDetails {
  assigneeUserId: string;
  columnId: string;
  title: string;
  description: string;
  deadline: Date;
  tags: string[];
  selectedImage?: File | null;
}

interface TodoUpdateProps {
  isOpen: boolean;
  cardDetails: CardDetails;
  closeModal: () => void;
  dashboardId: number;
}

const TodoUpdate: React.FC<TodoUpdateProps> = ({ isOpen, cardDetails, closeModal, dashboardId }) => {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(cardDetails ? cardDetails.columnId : '');
  const [selectedAssignee, setSelectedAssignee] = useState<string>(cardDetails ? cardDetails.assigneeUserId : '');
  const [formData, setFormData] = useState({
    assigneeUserId: cardDetails ? cardDetails.assigneeUserId : '',
    title: cardDetails ? cardDetails.title : '',
    description: cardDetails ? cardDetails.description : '',
    deadline: cardDetails && cardDetails.deadline ? new Date(cardDetails.deadline) : new Date(),
    tags: cardDetails && cardDetails.tags ? cardDetails.tags.join(', ') : '',
    selectedImage: null,
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 멤버 목록 가져오기
        const membersData = await getMembersApi(dashboardId);
        setMembers(membersData.members);

        // 컬럼 목록 가져오기 (기존 코드 유지)
        const columnsData = await getColumnListApi(dashboardId);
        setStatuses(columnsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dashboardId]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectStatus = statusId => {
    setSelectedStatus(statusId);
    setFormData({ ...formData, columnId: statusId });
  };

  const handleSelectAssignee = userId => {
    setSelectedAssignee(userId);
    setFormData({ ...formData, assigneeUserId: userId });
  };

  const handleImageUpload = file => {
    console.log('Image upload logic goes here', file);
  };

  const isFormValid = () => {
    return formData.title && formData.description && formData.deadline;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid()) {
      console.error('Form is not valid');
      return;
    }

    const cardData = {
      ...formData,
      columnId: parseInt(selectedStatus),
      assigneeUserId: parseInt(selectedAssignee),
      dueDate: formData.deadline.toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      imageUrl: formData.selectedImage,
    };

    try {
      await editCardApi(cardData);
      console.log('Card updated successfully');
      closeModal();
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  return (
    <div>
      <button className="btn">
        <img src="/images/add.svg" />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="할 일 수정" showCloseButton={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex gap-5">
              <div className="flex-col">
                <label htmlFor="assigneeUserId" className="block font-bold text-sm mb-1">
                  상태
                </label>
                <div className="relative w-full">
                  <div tabIndex={0} className="dropdown">
                    {statuses && statuses.length > 0 && (
                      <label tabIndex={0} className="btn border-gray-300 font-normal mb-3 text-gray-400 bg-white">
                        {statuses.find(status => status.id === selectedStatus)?.name || '상태를 선택해 주세요'}
                        <img src="/images/arrow_drop_down.svg" alt="Dropdown" />
                      </label>
                    )}
                    {statuses && statuses.length > 0 && (
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {statuses.map(status => (
                          <li key={status.id} onClick={() => handleSelectStatus(status.id)}>
                            <a>{status.name}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <label htmlFor="assigneeUserId" className="block font-bold text-sm mb-1">
                  담당자
                </label>
                <div className="relative w-full">
                  <div tabIndex={0} className="dropdown">
                    {members && members.length > 0 && (
                      <label tabIndex={0} className="btn border-gray-300 font-normal mb-3 text-gray-400 bg-white">
                        {members.find(member => member.userId.toString() === formData.assigneeUserId)?.nickname || '이름을 선택해 주세요'}
                        <img src="/images/arrow_drop_down.svg" alt="Dropdown" />
                      </label>
                    )}
                    {members && members.length > 0 && (
                      <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52">
                        {members.map(member => (
                          <li key={member.id} onClick={() => handleSelectAssignee(member.userId.toString())}>
                            <a>{member.nickname}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <label htmlFor="title" className="block font-bold text-sm mb-1">
              제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목을 입력해 주세요"
              className="input input-bordered w-full mb-3 "
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-bold text-sm mb-1">
              설명
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="설명을 입력해 주세요"
              className="input input-bordered w-full h-24 mb-3"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="deadline" className="block font-bold text-sm mb-1">
              마감일
            </label>
            <DatePicker
              className="input input-bordered w-2/4 mb-3"
              dateFormat="yyyy-MM-dd"
              selected={formData.deadline}
              onChange={date => {
                if (date) {
                  setFormData(prev => ({ ...prev, deadline: date }));
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="tags" className="block font-bold text-sm mb-1">
              태그
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="입력 후 Enter"
              className="input input-bordered w-full mb-3 "
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="file" className="block font-bold text-sm mb-1">
              이미지
            </label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn w-32" onClick={closeModal}>
              취소
            </button>
            <button type="submit" className="btn w-32 btn-primary" disabled={!isFormValid()}>
              수정
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoUpdate;
