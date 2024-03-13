import { Invitation } from "@/api/InvitationApi";
import { getDashboardInvitationsApi } from "@/api/dashboardsApi";
import Image from "next/image";
import { useId } from "react";


const getDashboardInvitations = async (dashboardId: number, pageIndex: number, size: number) => {
  return await getDashboardInvitationsApi(dashboardId, pageIndex, size);
}

export default async function InviteList({page}: {page: number}) {
  const id = useId();

  const InviteItem = ({invitee} : {invitee: {id: number, email:string, nickname:string}}) => {
    return (
      <li className="relative flex flex-row h-14 justify-between items-center bg-white px-5">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">{invitee.email}</span>
        </div>
        <button className="flex justify-center items-center h-7 px-3 py-2 rounded border border-gray-D9D9D9 text-xs text-violet-5534DA"><strong>취소</strong></button>
      </li>
    )
  }

  const InviteItems = ({invitations}: {invitations: Invitation[]}) => {
    return (
      <ul className="flex flex-col gap-[1px]">
        {invitations.map((invitation) => {
          return <InviteItem key={`${id}-${invitation.invitee.id}`} invitee={invitation.invitee} />
        })}
      </ul>
    )
  }

  const {totalCount, invitations} = await getDashboardInvitations(4570, 1, 5);

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row justify-between items-center mb-3 pt-5 px-5">
        <strong className="text-xl">초대 내역</strong>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xs">{`${totalCount} 페이지 중 ${page}`}</div>
          <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
            <button className="flex flex-row justify-center items-center w-9 h-9 bg-white active:bg-gray-D9D9D9">
              <Image className="opacity-20 hover:opacity-100" src="/images/arrow-forward-left.svg" width="16" height="16" alt="arrow-left" />
            </button>
            <button className="flex flex-row justify-center items-center w-9 h-9 bg-white active:bg-gray-D9D9D9">
              <Image className="opacity-20 hover:opacity-100" src="/images/arrow-forward-right.svg" width="16" height="16" alt="arrow-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-5 mb-6">
        <span className="mb-5 text-gray-9FA6B2">이메일</span>
        <button>
          <div className="flex flex-row items-center px-3 py-2 gap-2 rounded bg-violet-5534DA">
            <Image src="/images/add-white.svg" width="20" height="20" alt="plus" />
            <span className="text-white text-xs">초대하기</span>
          </div>
        </button>
      </div>
      <div>
        <InviteItems invitations={invitations}/>
      </div>
    </div>
  )
}