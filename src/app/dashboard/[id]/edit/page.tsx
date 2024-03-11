import DashboardBack from "./(Components)/DashboardBack";
import DashboardDelete from "./(Components)/DashboardDelete";
import DashboardName from "./(Components)/DashboardName";
import InviteList from "./(Components)/InviteList";
import MemeberList from "./(Components)/MemberList";

export default function Page({ params: {id} }: { params: {id: string}}) {
  return (
    <article className="flex flex-col w-full h-full pt-4 px-3 pb-6">
      <section className="mb-5"><DashboardBack /></section>
      <section className="mb-3"><DashboardName /></section>
      <section className="mb-3"><MemeberList /></section>
      <section className="mb-9"><InviteList /></section>
      <section><DashboardDelete /></section>
    </article>
  );
}