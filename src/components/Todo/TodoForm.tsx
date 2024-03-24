'use client';
import React, { useState, useEffect, KeyboardEvent } from 'react';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/components/hooks/useModal/useModal';
import ImageUpload from '../ImageUpload/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMembersApi, Member } from '@/api/membersApi';
import { postCardApi } from '@/api/cardApi';

interface TodoFormProps {
  dashboardId: number;
  columnId: number;
}

export interface CardForm {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: Date;
  tags: string[];
  imageUrl?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ dashboardId, columnId }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<CardForm>({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    tags: [],
  });
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getMembersApi(dashboardId, 1, 10);
      if (res && res.members) {
        setMembers(res.members);
      }
    };

    fetchMembers().catch(error => console.error('멤버 조회 오류:', error));
  }, [dashboardId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string | null): void => {
    setFormData(prev => ({
      ...prev,
      imageUrl: imageUrl !== null ? imageUrl : prev.imageUrl,
    }));
  };

  const isFormValid = () => {
    const { assigneeUserId, title, description, dueDate, tags } = formData;

    return !!assigneeUserId && !!title.trim() && !!description.trim() && !!dueDate && tags.length > 0;
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prevFormData => ({
          ...prevFormData,
          tags: [...prevFormData.tags, newTag],
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tags: prevFormData.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const resetFormData = () => {
    setFormData({
      assigneeUserId: 0,
      dashboardId: 0,
      columnId: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      tags: [],
    });
  };

  const handleCloseModal = () => {
    resetFormData();
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      console.error('Form is not valid.');
      return;
    }

    const { assigneeUserId, title, description, dueDate, imageUrl } = formData;
    const cardData = {
      assigneeUserId: assigneeUserId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate: dueDate.toISOString().slice(0, 16).replace('T', ' '),
      tags: formData.tags.map(tag => tag.trim()),
      ...(imageUrl && { imageUrl: imageUrl }),
    };
    try {
      await postCardApi(cardData);
      closeModal();
      // location.reload();
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleSelectAssignee = (userId: number) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      assigneeUserId: userId,
    }));
  };

  return (
    <div className="flex">
      <button
        onClick={openModal}
        className="flex justify-center items-center w-72 md:w-537 lg:w-80 h-8 md:h-10 rounded-md bg-white mb-5 border-2 border-slate-200 hover:border-primary-BASIC transition duration-500"
      >
        <img src="/images/add.svg" className="bg-violet-200 rounded-md" alt="카드 추가하기 버튼 아이콘" />
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="할 일 생성" showCloseButton={false}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="assigneeUserId" className="flex font-bold text-sm mb-4">
                담당자
              </label>
              <div className="flex relative w-full">
                <div tabIndex={0} className="dropdown">
                  <label tabIndex={0} className="btn border-gray-300 font-normal mb-3 text-gray-400 bg-white w-full">
                    {members.find(member => member.userId === formData.assigneeUserId)?.nickname || '이름을 선택해 주세요'}
                    <img src="/images/arrow_drop_down.svg" alt="Dropdown" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52">
                    {members.map(member => (
                      <li key={member.id} onClick={() => handleSelectAssignee(member.userId)}>
                        <a>{member.nickname}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label htmlFor="title" className="flex font-bold text-sm mb-4">
                제목
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="제목을 입력해 주세요"
                className="input input-bordered w-full mb-3 text-sm"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="flex font-bold text-sm mb-4">
                설명
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="설명을 입력해 주세요"
                className="input input-bordered w-full h-24 mb-3 text-sm"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="deadline" className="flex font-bold text-sm mb-4">
                마감일
              </label>
              <DatePicker
                className="flex cursor-pointer input input-bordered w-2/4 mb-3"
                dateFormat="yyyy-MM-dd"
                selected={formData.dueDate}
                onChange={date => {
                  if (date) {
                    setFormData(prev => ({ ...prev, dueDate: date }));
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="tags" className="flex font-bold text-sm mb-4">
                태그
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="태그입력 후 Enter"
                className="flex input input-bordered mb-3 text-sm"
                onKeyDown={handleTagInputKeyDown}
              />
              <div className="tags-list">
                {formData.tags.map((tag, index) => (
                  <div key={`${tag}-${index}`} className="tag">
                    {tag}{' '}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <img className="flex w-3 h-3" src="/images/cancel.svg" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="file" className="flex font-bold text-sm mb-4">
                이미지
              </label>
              <div className="flex">
                <ImageUpload columnId={columnId} onImageUpload={handleImageUpload} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" className="btn w-32 text-gray-500" onClick={handleCloseModal}>
                취소
              </button>
              <button type="submit" className="w-32 bg-primary-BASIC rounded-md text-white" disabled={!isFormValid()}>
                생성
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TodoForm;
