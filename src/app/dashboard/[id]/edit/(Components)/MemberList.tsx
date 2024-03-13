import { Member, getDashboardMembersApi } from '@/api/dashboardsApi';
import Image from 'next/image';
import { useId } from 'react';

const getDashboardMembers = async (dashboardId: number, pageIndex: number, size: number) => {
  const result = await getDashboardMembersApi(dashboardId, pageIndex, size);
  return result;
}

export default async function MemeberList({page}: {page: number}) {
  const showMemberCount = 8;
  const id = useId();

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
    console.log(members);
    return (
      <ul className="flex flex-col gap-[1px]">
        {members.map((member) => {
          return <MemberItem key={`${id}-${member.userId}`} member={member} />
        })}
      </ul>
    )
  }

  const result = await getDashboardMembers(4570, page, showMemberCount);
  if(result === null) return;

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row justify-between items-center mb-6 pt-5 px-5">
        <strong className="text-xl">구성원</strong>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xs">{`${result.totalCount} 페이지 중 ${page}`}</div>
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
      <span className="mb-5 text-gray-9FA6B2 px-5">이름</span>
      <div className="bg-gray-EEEEEE">
        <MemberItems members={result.members}/>
      </div>
    </div>
  )
}