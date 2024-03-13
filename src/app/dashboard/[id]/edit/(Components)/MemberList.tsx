import { Member, getDashboardMembersApi } from '@/api/dashboardsApi';
import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';

const getDashboardMembers = async (dashboardId: number, pageIndex: number, size: number) => {
  const result = await getDashboardMembersApi(dashboardId, pageIndex, size);
  return result;
}

export default async function MemeberList({dashboardId, member, invite}: {dashboardId:string, member: string, invite: string}) {
  const showMemberCount = 8;
  const id = useId();
  const page = Number(member);
  const dashboard = Number(dashboardId);

  const MemberItem = ({member}: {member: Member}) => {
    const profileUrl = member.profileImageUrl ? member.profileImageUrl : '/images/crown-icon.svg';
    return (
      <li className="relative flex flex-row h-14 justify-between items-center bg-white px-5">
        <div className="flex flex-row items-center gap-2">
          <Image src={profileUrl} width="32" height="32" alt="profile" />
          <span className="text-sm">{member.nickname}</span>
        </div>
        <button className="flex justify-center items-center h-7 px-3 py-2 rounded border border-gray-D9D9D9 text-xs text-violet-5534DA"><strong>삭제</strong></button>
      </li>
    )
  }

  const MemberItems = ({members}: {members: Member[]}) => {
    return (
      <ul className="flex flex-col gap-[1px]">
        {members.map((member) => {
          return <MemberItem key={`${id}-${member.userId}`} member={member} />
        })}
      </ul>
    )
  }

  const result = await getDashboardMembers(dashboard, page, showMemberCount);
  if(result === null) return;

  const maxPage = Math.ceil(result.totalCount / showMemberCount);
  const disabledNext = page === maxPage ? "pointer-events-none" : "";
  const disabledPrev = page === 1 ? "pointer-events-none" : "";

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row justify-between items-center mb-6 pt-5 px-5">
        <strong className="text-xl">구성원</strong>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xs">{`${maxPage} 페이지 중 ${page}`}</div>
          <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
            <Link className={`${disabledPrev} flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group`} 
              href = {
                {
                  pathname: `/dashboard/${dashboard}/edit`,
                  query: {member: `${page - 1}`, invite: `${invite}`}
                }
              }>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-left.svg" width="16" height="16" alt="arrow-left" />
            </Link>
            <Link className={`${disabledNext} flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group`} 
              href = {
                {
                  pathname: `/dashboard/${dashboard}/edit`,
                  query: {member: `${page + 1}`, invite: `${invite}`}
                }
              }>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-right.svg" width="16" height="16" alt="arrow-right" />
            </Link>
          </div>
        </div>
      </div>
      <span className="mb-5 text-gray-9FA6B2 px-5">이름</span>
      <div className="bg-gray-EEEEEE">
        <MemberItems members={result.members}/>
      </div>
    </div>
  )
}