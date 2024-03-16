import React, { useContext } from 'react';
import { Invitation, putInvitation } from '@/api/InvitationApi';
import { getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { DashboardContext } from '@/context/DashboardContext';

interface InvitationListProps {
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
}

export default function InvitationList({ invitations, setInvitations }: InvitationListProps) {
  const { setData } = useContext(DashboardContext);

  const handlePutInvitation = async (invitationId: number, isAccepted: boolean) => {
    const res = await putInvitation(invitationId, isAccepted);
    if (res.status === 200) {
      const data = await getDashboardsByPaginationApi(1, 3000);
      setData(data);
    }
    const updatedInvitations = invitations.filter(invitation => invitation.id !== invitationId);

    // 새로운 초대 목록을 상태로 설정하여 컴포넌트를 다시 렌더링합니다.
    setInvitations(updatedInvitations);
  };
  return (
    <div>
      <div className="hidden md:flex md:justify-between">
        <div>이름</div>
        <div>초대자</div>
        <div>수락 여부</div>
      </div>
      {invitations.map(invitation => (
        <div className="p-4 border-b flex flex-col text-sm md:flex-row md:justify-between " key={invitation.id}>
          <div className="flex mb-2.5">
            <p className="w-16 md:hidden">이름</p>
            <p>{invitation.dashboard.title}</p>
          </div>
          <div className="flex mb-4">
            <p className="w-16 md:hidden">초대자</p>
            <p>{invitation.inviter.nickname}</p>
          </div>
          <div className="text-xs flex gap-2">
            <button className="w-24 h-7 border border-gray_D9D9D9 rounded-lg" onClick={() => handlePutInvitation(invitation.id, true)}>
              수락
            </button>
            <button className="w-24 h-7 border border-gray_D9D9D9 rounded-lg" onClick={() => handlePutInvitation(invitation.id, false)}>
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
