'use client';

import { postDashboardInvitationsApi } from '@/api/dashboardsApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const postDashboardInvitations = async (dashboardId: string, email: string) => {
  return await postDashboardInvitationsApi(Number(dashboardId), email);
};

interface InviteModalProps {
  id: string;
  pathname: string;
  query: string;
}

export default function InviteModal({ id, pathname, query }: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState<string>('');

  const router = useRouter();

  const onClickCancel = () => {
    router.push(`${pathname}?${query}&inviteModal=off`);
  };

  const onClickInvite = () => {
    postDashboardInvitations(id, inviteEmail).then(res => {
      router.push(`${pathname}?${query}&inviteModal=off`);
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
