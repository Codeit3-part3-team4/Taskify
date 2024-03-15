import React, { useContext } from 'react';
import { Invitation, putInvitation } from '@/api/InvitationApi';
import { getDashboardsByPaginationApi } from '@/api/dashboardsApi';
import { DashboardContext } from '@/context/dashboardContext';

interface InvitationListProps {
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
}

export default function InvitationList({
  invitations,
  setInvitations,
}: InvitationListProps) {
  const { setData } = useContext(DashboardContext);

  const handlePutInvitation = async (
    invitationId: number,
    isAccepted: boolean,
  ) => {
    const res = await putInvitation(invitationId, isAccepted);
    if (res.status === 200) {
      const data = await getDashboardsByPaginationApi(1, 3000);
      setData(data);
    }
    const updatedInvitations = invitations.filter(
      invitation => invitation.id !== invitationId,
    );

    // 새로운 초대 목록을 상태로 설정하여 컴포넌트를 다시 렌더링합니다.
    setInvitations(updatedInvitations);
  };
  return (
    <div>
      {invitations.map(invitation => (
        <div key={invitation.id}>
          <p>대시보드 이름: {invitation.dashboard.title}</p>
          <p>초대자: {invitation.inviter.nickname}</p>
          <button onClick={() => handlePutInvitation(invitation.id, true)}>
            수락
          </button>
          <button onClick={() => handlePutInvitation(invitation.id, false)}>
            거절
          </button>
        </div>
      ))}
    </div>
  );
}
