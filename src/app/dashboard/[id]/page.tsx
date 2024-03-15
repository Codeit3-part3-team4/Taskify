export default function Page({ params: {id} }: { params: {id: string}}) {
  return (
    <div>
      <h1>Dashboard {id}</h1>
    </div>
  );
}