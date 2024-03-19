'use client';

import { postDashboardInvitationsApi } from '@/api/dashboardsApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const postDashboardInvitations = async (dashboardId: number, email: string) => {
  return await postDashboardInvitationsApi(dashboardId, email);
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
  console.log(router);

  const onClickCancel = () => {
    if (onClose) onClose();
    else router.push(`${pathname}?${query}&inviteModal=off`);
  };

  const onClickInvite = () => {
    postDashboardInvitations(id, inviteEmail).then(res => {
      if (onClose) onClose();
      else router.push(`${pathname}?${query}&inviteModal=off`);
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
        <button className="w-full py-3 rounded-md border border-gray-D9D9D9 active:bg-violet-5534DA active:text-white" onClick={onClickCancel}>
          취소
        </button>
        <button className="w-full py-3 rounded-md border border-gray-D9D9D9 active:bg-violet-5534DA active:text-white" onClick={onClickInvite}>
          초대
        </button>
      </div>
    </div>
  );
}
