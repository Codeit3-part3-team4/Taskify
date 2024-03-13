import DashboardBack from "./(Components)/DashboardBack";
import DashboardDelete from "./(Components)/DashboardDelete";
import DashboardName from "./(Components)/DashboardName";
import InviteList from "./(Components)/InviteList";
import MemeberList from "./(Components)/MemberList";

export default function Page({ params: {id}, searchParams: {member, invite} }: { params: {id: string}, searchParams: {member: string, invite: string}}) {


  return (
    <article className="flex flex-col w-full h-screen pt-4 px-3 pb-6 bg-gray-FAFAFA">
      <section className="mb-5"><DashboardBack /></section>
      <section className="mb-3"><DashboardName /></section>
      <section className="mb-3"><MemeberList dashboardId={id} member={member} invite={invite} /></section>
      <section className="mb-9"><InviteList dashboardId={id} member={member} invite={invite}/></section>
      <section><DashboardDelete /></section>
    </article>
  );
}