import { Invitation } from "@/api/InvitationApi";
import { getDashboardInvitationsApi } from "@/api/dashboardsApi";
import { useId } from "react";


const getDashboardInvitations = async (dashboardId: number, pageIndex: number, size: number) => {
  return await getDashboardInvitationsApi(dashboardId, pageIndex, size);
}

export default async function InviteList() {
  const id = useId();

  const InviteItem = ({invitee} : {invitee: {id: number, email:string, nickname:string}}) => {
    return (
      <li className="flex flex-row justify-between">
        <div>{invitee.email}</div>
        <div>삭제</div>
      </li>
    )
  }

  const InviteItems = ({invitations}: {invitations: Invitation[]}) => {
    return (
      <ul>
        {invitations.map((invitation) => {
          return <InviteItem key={`${id}-${invitation.invitee.id}`} invitee={invitation.invitee} />
        })}
      </ul>
    )
  }

  const {totalCount, invitations} = await getDashboardInvitations(4570, 1, 5);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <strong>초대 내역</strong>
        <div className="flex flex-row gap-3">
          <div>1/5</div>
          <div>
            <button>이전페이지</button>
            <button>다음페이지</button>
          </div>
          <div>
            <button>초대하기</button>
          </div>
        </div>
      </div>
      <span>이메일</span>
      <div>
        <InviteItems invitations={invitations}/>
      </div>
    </div>
  )
}