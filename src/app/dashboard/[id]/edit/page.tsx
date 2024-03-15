import DashboardBack from "./(Components)/DashboardBack";
import DashboardDelete from "./(Components)/DashboardDelete";
import DashboardName from "./(Components)/DashboardName";
import InviteList from "./(Components)/InviteList";
import MemeberList from "./(Components)/MemberList";

export interface searchParamsProps {
  memberPage: string;
  invitePage: string;
  deleteMember?: string;
  cancelInvite?: string;
}

export default function Page({ params: {id}, searchParams }: { params: {id: string}, searchParams: searchParamsProps}) {  
  return (
    <article className="flex flex-col w-full h-screen pt-4 px-3 pb-6 max-w-[660px] bg-gray-FAFAFA">
      <section className="mb-5"><DashboardBack /></section>
      <section className="mb-3"><DashboardName /></section>
      <section className="mb-3"><MemeberList dashboardId={id} searchParams={searchParams} /></section>
      <section className="mb-9"><InviteList dashboardId={id} searchParams={searchParams}/></section>
      <section><DashboardDelete dashboardId={id} /></section>
    </article>
  );
}