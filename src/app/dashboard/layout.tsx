export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <nav>네비게이션바</nav>
      <div>
        <div>사이드바</div>
        {children}
      </div>
    </>
  );
}