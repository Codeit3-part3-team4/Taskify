import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import ImageUpload from '../ImageUpload/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMembersApi } from '@/api/membersApi';
import { getColumnListApi } from '@/api/columnApi';
import { editCardApi } from '@/api/cardApi';

interface Status {
  id: string;
  title: string;
}

interface Member {
  id: string;
  userId: string;
  nickname: string;
}

interface TodoUpdateProps {
  isOpen: boolean;
  cardId: number;
  cardDetails: {
    assigneeUserId: string;
    columnId: string;
    title: string;
    description: string;
    deadline: Date;
    tags: string[];
    selectedImage?: string;
  };
  closeModal: () => void;
  dashboardId: number;
  columnId: number;
}

const TodoUpdate: React.FC<TodoUpdateProps> = ({ isOpen, cardDetails, closeModal, dashboardId, columnId, cardId }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(cardDetails ? cardDetails.columnId : '');
  const [selectedAssignee, setSelectedAssignee] = useState<string>(cardDetails ? cardDetails.assigneeUserId : '');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    assigneeUserId: cardDetails ? cardDetails.assigneeUserId : '',
    title: cardDetails ? cardDetails.title : '',
    description: cardDetails ? cardDetails.description : '',
    deadline: cardDetails && cardDetails.deadline ? new Date(cardDetails.deadline) : new Date(),
    tags: cardDetails && cardDetails.tags ? cardDetails.tags.join(', ') : '',
    selectedImage: '',
  });
  const [members, setMembers] = useState<Member[]>([]);

  const fetchData = async (page, size) => {
    try {
      const membersData = await getMembersApi(dashboardId, page, size);
      setMembers(membersData.members);

      const columnsData = await getColumnListApi(dashboardId);
      setStatuses(columnsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(1, 10);
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

  const handleImageUpload = imageUrl => {
    setFormData(prev => ({ ...prev, selectedImage: imageUrl }));
  };

  const isFormValid = () => {
    return formData.title && formData.description && formData.deadline;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Is form valid:', isFormValid());
    if (!isFormValid()) {
      console.error('Form is not valid');
      return;
    }

    setIsUpdating(true);

    const formattedDeadline = formData.deadline.toISOString().slice(0, 16).replace('T', ' ');

    const formattedTags = formData.tags.split(',').map(tag => tag.trim());

    const cardData = {
      columnId: parseInt(selectedStatus),
      assigneeUserId: parseInt(selectedAssignee),
      title: formData.title,
      description: formData.description,
      dueDate: formattedDeadline,
      tags: formattedTags,
      ...(formData.selectedImage && { imageUrl: formData.selectedImage }),
    };
    console.log('Card data:', cardData);

    try {
      await editCardApi(cardId, cardData);
      closeModal();
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Failed to update card:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div>
      {isUpdating ? (
        <div className="skeleton w-full"></div>
      ) : (
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
                          {statuses.find(status => status.id === selectedStatus)?.title || '상태를 선택해 주세요'}
                          <img src="/images/arrow_drop_down.svg" alt="Dropdown" />
                        </label>
                      )}
                      {statuses && statuses.length > 0 && (
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          {statuses.map(status => (
                            <li key={status.id} onClick={() => handleSelectStatus(status.id)}>
                              <a>{status.title}</a>
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
                dateFormat="YYYY-MM-dd HH:MM"
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
              <ImageUpload columnId={columnId} onImageUpload={handleImageUpload} />
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
      )}
    </div>
  );
};

export default TodoUpdate;
