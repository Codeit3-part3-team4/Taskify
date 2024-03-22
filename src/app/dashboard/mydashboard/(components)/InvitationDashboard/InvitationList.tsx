import React, { useContext } from 'react';
import { Invitation, putInvitation } from '@/api/InvitationApi';
import { DashboardContext } from '@/context/DashboardContext';

interface InvitationListProps {
  processedInvitations: Invitation[];
  setProcessedInvitations: (invitations: Invitation[]) => void;
}

export default function InvitationList({ processedInvitations, setProcessedInvitations }: InvitationListProps) {
  const { refresh, setRefresh } = useContext(DashboardContext);

  const handlePutInvitation = async (invitationId: number, isAccepted: boolean) => {
    const res = await putInvitation(invitationId, isAccepted);
    if (res.status === 200) {
      setRefresh(!refresh);
    }
    const updatedInvitations = processedInvitations.filter(invitation => invitation.id !== invitationId);

    // 새로운 초대 목록을 상태로 설정하여 컴포넌트를 다시 렌더링합니다.
    setProcessedInvitations(updatedInvitations);
  };
  return (
    <div>
      <div className="hidden md:flex md:justify-around p-4">
        <div className="w-52 flex justify-around">이름</div>
        <div className="w-52 flex justify-around">초대자</div>
        <div className="w-52 flex justify-around">수락 여부</div>
      </div>
      {processedInvitations.map(invitation => (
        <div className="p-4 border-b flex flex-col text-sm md:flex-row md:justify-around" key={invitation.id}>
          <div className="flex mb-2.5">
            <p className="w-16 md:hidden">이름</p>
            <p className="w-52 flex justify-around">{invitation.dashboard.title}</p>
          </div>
          <div className="flex mb-4">
            <p className="w-16 md:hidden">초대자</p>
            <p className="w-52 flex justify-around">{invitation.inviter.nickname}</p>
          </div>
          <div className="w-52 text-xs flex gap-2">
            <button
              className="w-24 h-7 border border-gray-D9D9D9 rounded-lg bg-purple-760DDE bg-primary-BASIC text-white hover:scale-105"
              onClick={() => handlePutInvitation(invitation.id, true)}
            >
              수락
            </button>
            <button
              className="w-24 h-7 border border-gray-D9D9D9 rounded-lg text-purple-760DDE bg-white hover:bg-gray-D9D9D9"
              onClick={() => handlePutInvitation(invitation.id, false)}
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
