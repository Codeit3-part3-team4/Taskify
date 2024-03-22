import DashboardBack from './(components)/DashboardBack';
import DashboardDelete from './(components)/DashboardDelete';
import DashboardName from './(components)/DashboardName';
import InviteList from './(components)/InviteList';
import MemeberList from './(components)/MemberList';
import { deleteMemberApi } from '@/api/membersApi';
import { deleteDashboardInvitationsCancelApi } from '../../../../api/dashboardsApi';

export interface searchParamsProps {
  memberPage: string;
  invitePage: string;
  deleteMember?: string;
  cancelInvite?: string;
  inviteModal?: string;
}

const deleteMember = async (memberId: number) => {
  const result = await deleteMemberApi(memberId);
  return result;
};

const deleteDashboardInvitationsCancel = async (id: number, memberId: number) => {
  const result = await deleteDashboardInvitationsCancelApi(id, memberId);
  return result;
};

export default async function Page({ params: { id }, searchParams }: { params: { id: string }; searchParams: searchParamsProps }) {
  if (searchParams.deleteMember) await deleteMember(Number(searchParams.deleteMember));
  if (searchParams.cancelInvite) await deleteDashboardInvitationsCancel(Number(id), Number(searchParams.cancelInvite));

  return (
    <article className="flex flex-col w-full h-[calc(100dvh-6rem)] overflow-scroll pt-4 px-3 pb-6 mt-24 max-w-[660px] ">
      <section className="mb-5">
        <DashboardBack />
      </section>
      <section className="mb-3">
        <DashboardName dashboardId={id} />
      </section>
      <section className="mb-3">
        <MemeberList dashboardId={id} searchParams={searchParams} />
      </section>
      <section className="mb-9">
        <InviteList dashboardId={id} searchParams={searchParams} />
      </section>
      <section>
        <DashboardDelete dashboardId={id} />
      </section>
    </article>
  );
}
