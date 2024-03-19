import { Invitation } from '@/api/InvitationApi';
import { getDashboardInvitationsApi } from '@/api/dashboardsApi';
import Image from 'next/image';
import { useId } from 'react';
import { searchParamsProps } from '../page';
import Modal from '@/components/Modal/Modal';
import Link from 'next/link';
import { LinkText, LinkImage } from './LinkComponents';
import InviteModal from './InviteModal';

const getDashboardInvitations = async (dashboardId: number, pageIndex: number, size: number) => {
  return await getDashboardInvitationsApi(dashboardId, pageIndex, size);
};

export default async function InviteList({ dashboardId, searchParams }: { dashboardId: string; searchParams: searchParamsProps }) {
  const showInviteCount = 5;
  const id = useId();
  const page = Number(searchParams.invitePage);
  const memberPage = Number(searchParams.memberPage);
  const dashboard = Number(dashboardId);
  const isInviteModal = searchParams.inviteModal === 'on' ? true : false;

  const InviteItem = ({ invitation }: { invitation: Invitation }) => {
    return (
      <li className="relative flex flex-row h-14 justify-between items-center bg-white px-5">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">{invitation.invitee.email}</span>
        </div>
        <LinkText
          options=""
          pathname={`/dashboard/${dashboard}/edit`}
          query={{ memberPage: `${memberPage}`, invitePage: `${page}`, cancelInvite: `${invitation.id}` }}
        >
          <strong>취소</strong>
        </LinkText>
      </li>
    );
  };

  const InviteItems = ({ invitations }: { invitations: Invitation[] }) => {
    return (
      <ul className="flex flex-col gap-[1px]">
        {invitations.map(invitation => {
          return <InviteItem key={`${id}-${invitation.invitee.id}`} invitation={invitation} />;
        })}
      </ul>
    );
  };

  const InviteButton = ({ options }: { options: string }) => {
    return (
      <Link
        className={`${options}`}
        href={{
          pathname: `/dashboard/${dashboard}/edit`,
          query: { memberPage: `${memberPage}`, invitePage: `${page}`, inviteModal: 'on' },
        }}
      >
        <div className="flex flex-row items-center px-3 py-2 gap-2 rounded bg-violet-5534DA">
          <Image src="/images/add-white.svg" width="20" height="20" alt="plus" />
          <span className="text-white text-xs">초대하기</span>
        </div>
      </Link>
    );
  };

  const { totalCount, invitations } = await getDashboardInvitations(dashboard, page, showInviteCount);
  if (invitations === null) return;

  const maxPage = Math.ceil(totalCount / showInviteCount);
  const disabledNext = page === maxPage ? 'pointer-events-none' : '';
  const disabledPrev = page === 1 ? 'pointer-events-none' : '';

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row justify-between items-center mb-3 pt-5 px-5">
        <strong className="text-xl">초대 내역</strong>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xs">{`${maxPage} 페이지 중 ${page}`}</div>
          <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
            <LinkImage options={disabledPrev} pathname={`/dashboard/${dashboard}/edit`} query={{ memberPage: `${memberPage}`, invitePage: `${page - 1}` }}>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-left.svg" width="16" height="16" alt="arrow-left" />
            </LinkImage>
            <LinkImage options={disabledNext} pathname={`/dashboard/${dashboard}/edit`} query={{ memberPage: `${memberPage}`, invitePage: `${page + 1}` }}>
              <Image className="opacity-20 group-hover:opacity-100" src="/images/arrow-forward-right.svg" width="16" height="16" alt="arrow-right" />
            </LinkImage>
          </div>
          <InviteButton options="hidden md:flex" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-5 mb-6">
        <span className="mb-5 text-gray-9FA6B2">이메일</span>
        <InviteButton options="md:hidden" />
      </div>
      <div>
        <InviteItems invitations={invitations} />
      </div>
      <Modal isOpen={isInviteModal} title={'초대하기'} showCloseButton={false}>
        <InviteModal id={Number(dashboardId)} pathname={`/dashboard/${dashboard}/edit`} query={`memberPage=${memberPage}&invitePage=${page}`} />
      </Modal>
    </div>
  );
}
