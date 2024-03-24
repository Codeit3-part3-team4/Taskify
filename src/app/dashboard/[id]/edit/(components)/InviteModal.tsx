'use client';

import { postDashboardInvitationsApi } from '@/api/dashboardsApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const postDashboardInvitations = async (dashboardId: number, email: string) => {
  const result = await postDashboardInvitationsApi(dashboardId, email);
  result.status === 201 ? alert('초대에 성공했습니다.') : alert(`${result.data.message}`);

  if (result.status === 400 || result.status === 409 || result.status === 404)
    return false; // 입력 오류로 재입력 필요
  else return true; // 초대 성공 or 500 error 창 종료
};

interface InviteModalProps {
  id: number;
  pathname: string;
  query?: string;
  onClose?: () => void;
}

export default function InviteModal({ id, pathname, query, onClose }: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const router = useRouter();

  const onClickCancel = () => {
    if (onClose) onClose();
    else router.push(`${pathname}?${query}&inviteModal=off`);
  };

  const onClickInvite = () => {
    postDashboardInvitations(id, inviteEmail).then(res => {
      if (res === true) {
        if (onClose) onClose();
        else router.push(`${pathname}?${query}&inviteModal=off`);
      }
    });
  };

  return (
    <div className="flex flex-col">
      <strong className="mb-3">이메일</strong>
      <input
        className="h-12 text-sm px-4 mb-6 rounded-md border border-gray-D9D9D9"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={inviteEmail}
        onChange={e => setInviteEmail(e.currentTarget.value)}
      />
      <div className="flex flex-row gap-3">
        <div className="w-full"></div>
        <div className="w-full flex flex-row gap-2">
          <button className="w-full py-3 rounded-md border border-gray-D9D9D9 hover:bg-gray-D9D9D9" onClick={onClickCancel}>
            취소
          </button>
          <button className="w-full py-3 rounded-md border bg-primary-BASIC text-white border-gray-D9D9D9 hover:scale-105" onClick={onClickInvite}>
            초대
          </button>
        </div>
      </div>
    </div>
  );
}
