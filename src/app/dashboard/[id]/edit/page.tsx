import DashboardBack from './(Components)/DashboardBack';
import DashboardDelete from './(Components)/DashboardDelete';
import DashboardName from './(Components)/DashboardName';
import InviteList from './(Components)/InviteList';
import MemeberList from './(Components)/MemberList';
import { deleteMemberApi } from '@/api/membersApi';
import { deleteDashboardInvitationsCancelApi } from '../../../../api/dashboardsApi';

const deleteMember = async (memberId: number) => {
  const result = await deleteMemberApi(memberId);
  console.log(result);
  return result;
};

const deleteDashboardInvitationsCancel = async (id: number, memberId: number) => {
  const result = await deleteDashboardInvitationsCancelApi(id, memberId);
  console.log(result);
  return result;
};

export interface searchParamsProps {
  memberPage: string;
  invitePage: string;
  deleteMember?: string;
  cancelInvite?: string;
}

export default async function Page({ params: { id }, searchParams }: { params: { id: string }; searchParams: searchParamsProps }) {
  console.log(searchParams);
  if (searchParams.deleteMember) await deleteMember(Number(searchParams.deleteMember));
  if (searchParams.cancelInvite) await deleteDashboardInvitationsCancel(Number(id), Number(searchParams.cancelInvite));

  return (
    <article className="flex flex-col w-full h-screen pt-4 px-3 pb-6 max-w-[660px] bg-gray-FAFAFA">
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
