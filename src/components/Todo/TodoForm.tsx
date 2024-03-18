'use client';
import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/components/hooks/useModal/useModal';
import ImageUpload from '../ImageUpload/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMembersApi, Member } from '@/api/membersApi';
import { postCardApi } from '@/api/cardApi';

export default function TodoForm({ dashboardId, columnId }) {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    assigneeUserId: '',
    title: '',
    description: '',
    deadline: new Date(),
    tags: '',
    selectedImage: null,
  });
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getMembersApi(dashboardId, 1, 10); // Assuming page 1 and size 10 for example
      if (res && res.members) {
        setMembers(res.members);
      }
    };

    fetchMembers().catch(error => console.error('멤버 조회 오류:', error));
  }, [dashboardId]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = file => {
    setFormData(prev => ({ ...prev, selectedImage: file }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid()) {
      console.error('Form is not valid.');
      return;
    }

    const { assigneeUserId, title, description, deadline, tags, selectedImage } = formData;
    try {
      const cardData = {
        assigneeUserId: parseInt(assigneeUserId, 10),
        dashboardId,
        columnId,
        title,
        description,
        dueDate: deadline.toISOString(),
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl: selectedImage,
      };

      await postCardApi(cardData);
      closeModal();
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleSelectAssignee = userId => {
    setFormData(prevFormData => ({
      ...prevFormData,
      assigneeUserId: userId,
    }));
  };

  return (
    <div className="flex">
      <button onClick={openModal}>
        <img src="/images/add.svg" className="bg-violet-200 rounded-md" alt="카드 추가하기 버튼 아이콘" />
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="할 일 생성" showCloseButton={false}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="assigneeUserId" className="block font-bold text-sm mb-1">
                담당자
              </label>
              <div className="relative w-full">
                <div tabIndex={0} className="dropdown">
                  <label tabIndex={0} className="btn border-gray-300 font-normal mb-3 text-gray-400 bg-white">
                    {members.find(member => member.userId.toString() === formData.assigneeUserId)?.nickname || '이름을 선택해 주세요'}
                    <img src="/images/arrow_drop_down.svg" alt="Dropdown" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52">
                    {members.map(member => (
                      <li key={member.id} onClick={() => handleSelectAssignee(member.userId.toString())}>
                        <a>{member.nickname}</a>
                      </li>
                    ))}
                  </ul>
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
                생성
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
