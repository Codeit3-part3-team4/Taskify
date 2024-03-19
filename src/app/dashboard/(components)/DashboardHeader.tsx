'use client';

import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { getMembers } from '../[id]/edit/(components)/MemberList';
import { usePathname } from 'next/navigation';
import { Member, MembersInf } from '../../../api/membersApi';
import { MediaQueryType, useMediaQuery } from '@/components/hooks/useMediaQuery';
import { UserInfo, getUserInfo } from '@/api/userApi';
import { getDashboardDetailsApi } from '@/api/dashboardsApi';

interface ProfileImageProps {
  nickname: string;
  profileImageUrl: string;
  options?: string;
  style?: string;
}

const ProfileImage = ({ nickname, profileImageUrl, options, style }: ProfileImageProps) => {
  return (
    <div>
      {null === profileImageUrl ? (
        <div
          className={`flex justify-center items-center w-8 h-8 text-sm rounded-full bg-violet-5534DA outline outline-white text-white ${options}`}
          style={{ transform: style }}
        >
          <strong>{nickname}</strong>
        </div>
      ) : (
        <div
          className={`flex justify-center items-center w-8 h-8 text-sm rounded-full outline outline-white text-white ${options}`}
          style={{ transform: style }}
        >
          <Image className="w-full h-full rounded-full" src="/images/test3.svg" alt="Taskify" width="32" height="32" />
          <strong className="absolute">{nickname}</strong>
        </div>
      )}
    </div>
  );
};

export const FunctionalHeader = () => {
  const [membersInf, setMembersInf] = useState<MembersInf>();

  const { dashboardId } = useContext(DashboardContext);
  const pathname = usePathname();
  const mediaQuery = useMediaQuery();

  useEffect(() => {
    if (Number.isNaN(dashboardId)) return;

    getMembers(dashboardId, 1, 5)
      .then(res => {
        setMembersInf(res);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dashboardId]);

  if (pathname.split('/').includes('mydashboard')) return;
  if (membersInf === undefined) return;

  let showMemberCount = 3;
  if (MediaQueryType.TABLET === mediaQuery) showMemberCount = 3;
  if (MediaQueryType.DESKTOP === mediaQuery) showMemberCount = 5;

  const slicedMembers = membersInf.members.slice(0, showMemberCount);
  const displayMemberCount = showMemberCount < membersInf.totalCount ? `+${membersInf.totalCount - showMemberCount + 1}` : null;

  return (
    <div className="flex flex-row justify-center items-center h-full mr-3 md:mr-5">
      <div className="flex justify-center items-center text-xs rounded border border-gray-D9D9D9 px-3 py-2 mr-2 md:mr-3 md:gap-2">
        <Image className="hidden md:block w-5 h-5" src="/images/settings.svg" alt="Taskify" width="32" height="32" />
        <span>관리</span>
      </div>
      <div className="flex justify-center items-center text-xs rounded border border-gray-D9D9D9 px-3 py-2 mr-3 md:mr-8 md:gap-2">
        <Image className="hidden md:block w-5 h-5" src="/images/add_box.svg" alt="Taskify" width="15" height="15" />
        <span>초대하기</span>
      </div>
      <div className="relative flex flex-row justify-start mr-3 md:mr-5">
        {slicedMembers.map((member, index) => {
          const moveX = (showMemberCount - index - 1) * 15;
          const nickname = index === showMemberCount - 1 && displayMemberCount !== null ? displayMemberCount : member.nickname.slice(0, 1);
          return <ProfileImage key={index} nickname={nickname} profileImageUrl={member.profileImageUrl} style={`translateX(${moveX}%)`} />;
        })}
      </div>
      <div className="w-[1px] h-3/6 bg-gray-300"></div>
    </div>
  );
};

export default function DashboardHeader({ children }: { children: React.ReactNode }) {
  const [myProfile, setMyProfile] = useState<UserInfo>();
  const { dashboardId } = useContext(DashboardContext);
  const [title, setTitle] = useState<string>();
  const [ownerId, setOwnerId] = useState<number>();

  useEffect(() => {
    getDashboardDetailsApi(dashboardId).then(res => {
      setOwnerId(res.userId);
      setTitle(res.title);
    });
  }, [dashboardId]);

  useEffect(() => {
    getUserInfo().then(res => {
      if (res === null) return;
      setMyProfile(res);
    });
  }, []);

  if (myProfile === undefined) return null;

  return (
    <nav className={`flex flex-row justify-end lg:justify-between items-center w-full h-24`}>
      <div className="hidden relative lg:flex flex-row justify-center items-center gap-2">
        <strong>{title}</strong>
        {ownerId === myProfile.id && <Image src="/images/crown-icon.svg" alt="Taskify" width="35" height="35" />}
      </div>
      <div className="flex flex-row items-center h-full">
        {children}
        <div className="flex flex-row justify-end items-center">
          <ProfileImage nickname={myProfile.nickname.slice(0, 1)} profileImageUrl={myProfile.profileImageUrl} options={'mr-5 md:mr-3'} />
          <div className="hidden md:flex md:mr-5">{myProfile.nickname}</div>
        </div>
      </div>
    </nav>
  );
}