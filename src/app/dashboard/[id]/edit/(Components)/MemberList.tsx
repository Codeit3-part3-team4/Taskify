import { Member, getDashboardMembersApi } from '@/api/dashboardsApi';
import { useId } from 'react';

const getDashboardMembers = async (dashboardId: number, pageIndex: number, size: number) => {
  const result = await getDashboardMembersApi(dashboardId, pageIndex, size);
  return result;
}

export default async function MemeberList() {
  const pageIndex = 1; // TODO : using query string
  const id = useId();

  const MemberItem = ({member}: {member: Member}) => {
    return (
      <li className="flex flex-row justify-between">
        <div>
          <div>{member.profileImageUrl}</div>
          <span>{member.nickname}</span>
        </div>
        <button>삭제</button>
      </li>
    )
  }

  const MemberItems = ({members}: {members: Member[]}) => {
    return (
      <ul className="flex flex-col">
        {members.map((member) => {
          return <MemberItem key={`${id}-${member.id}`} member={member} />
        })}
      </ul>
    )
  }

  const result = await getDashboardMembers(4570, pageIndex, 4);
  if(result === null) return;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <strong>구성원</strong>
        <div className="flex flex-row gap-3">
          <div>1/5</div>
          <div>
            <button>이전페이지</button>
            <button>다음페이지</button>
          </div>
        </div>
      </div>
      <span>이름</span>
      <div>
        <MemberItems members={result.members}/>
      </div>
    </div>
  )
}