import { Invitation } from "@/api/InvitationApi";
import { getDashboardInvitationsApi } from "@/api/dashboardsApi";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";


const getDashboardInvitations = async (dashboardId: number, pageIndex: number, size: number) => {
  return await getDashboardInvitationsApi(dashboardId, pageIndex, size);
}

export default async function InviteList({dashboardId, member, invite}: {dashboardId:string, member: string, invite: string}) {
  const showInviteCount = 5;
  const id = useId();
  const page = Number(invite);
  const dashboard = Number(dashboardId);

  const InviteItem = ({invitee} : {invitee: {id: number, email:string, nickname:string}}) => {
    return (
      <li className="relative flex flex-row h-14 justify-between items-center bg-white px-5">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">{invitee.email}</span>
        </div>
        <button className="flex justify-center items-center h-7 px-3 py-2 rounded border border-gray-D9D9D9 text-xs text-violet-5534DA active:bg-gray-D9D9D9">
          <strong>취소</strong>
        </button>
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

  const {totalCount, invitations} = await getDashboardInvitations(dashboard, page, showInviteCount);
  if(invitations === null) return;

  const maxPage = Math.ceil(totalCount / showInviteCount);
  const disabledNext = page === maxPage ? "pointer-events-none" : "";
  const disabledPrev = page === 1 ? "pointer-events-none" : "";

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row justify-between items-center mb-3 pt-5 px-5">
        <strong className="text-xl">초대 내역</strong>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xs">{`${totalCount} 페이지 중 ${page}`}</div>
          <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
            <Link className={`${disabledPrev} flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group`} 
              href = {
                {
                  pathname: `/dashboard/${dashboard}/edit`,
                  query: {member: `${member}`, invite: `${page - 1}`}
                }
              }>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-left.svg" width="16" height="16" alt="arrow-left" />
            </Link>
            <Link className={`${disabledNext} flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group`}
              href = {
                {
                  pathname: `/dashboard/${dashboard}/edit`,
                  query: {member: `${member}`, invite: `${page + 1}`}
                }
              }>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-right.svg" width="16" height="16" alt="arrow-right" />
            </Link>
          </div>
          <button className="hidden md:flex">
            <div className="flex flex-row items-center px-3 py-2 gap-2 rounded bg-violet-5534DA">
              <Image src="/images/add-white.svg" width="20" height="20" alt="plus" />
              <span className="text-white text-xs">초대하기</span>
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-5 mb-6">
        <span className="mb-5 text-gray-9FA6B2">이메일</span>
        <button className="md:hidden">
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