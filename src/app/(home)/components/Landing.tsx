import Image from "next/image";

export default function Landing() {
  const Title = () => {
    return (
      <div className="flex flex-col items-center vertical-middle text-center align-middle">
        <div className="mb-10">
          <div className="w-[287px] h-[168px] rounded-lg overflow-hidden bg-white">
            <div className="w-full h-full"/>
          </div>
        </div>
        <div className="flex flex-col items-center text-4xl letter leading-10 gap-1">
          <strong className="mb-3">새로운 일정 관리</strong>
          <strong className="text-5xl text-violet-500/90 mb-5 leading-12">Taskify</strong>
        </div>
        <div className="text-xs mb-20">서비스의 메인 설명 들어갑니다</div>
        <div className="flex justify-center items-center rounded-lg w-60 h-11 bg-violet-500/90">
          <button className="w-full h-full">로그인하기</button>
        </div>
      </div>
    )
  }

  const MainThumb = ({ title, desc, desc2, children }: { title: string, desc: string, desc2: string, children: React.ReactNode }) => {
    return (
      <div className="flex flex-col justify-between w-343 h-686 md:w-664 md:h-972 2xl:w-1200 2xl:h-600 rounded-lg overflow-hidden bg-gray-300/10">
        <div className="flex flex-col items-center mt-16">
          <span className="text-lg text-gray-400 mb-20">{title}</span>
          <strong className="text-3xl text-center">{desc}<br/>{desc2}</strong>
        </div>
        {children}
      </div>
    );
  }

  const MiniThumb = ({ title, desc}: { title: string, desc: string }) => {
    return (
      <div className="w-[343px] h-[343px] rounded-lg overflow-hidden">
        <div className="flex justify-center items-center w-full h-2/3 bg-gray-300/10">
          <div className="w-64 h-48 rounded-lg overflow-hidden bg-white"></div>
        </div>
        <div className="flex flex-col justify-between w-full h-1/3 bg-gray-500/40 px-5 py-7">
          <strong className="text-base">{title}</strong>
          <span className="text-sm">{desc}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-white">
      <section className="mb-20">
        <Title />
      </section>
      <section className="mb-16">
        <MainThumb title="Point 1" desc="일의 우선순위를" desc2="관리하세요">
          <div className="flex flex-row justify-end">
            <div className={`w-296 h-248 md:w-519 md:h-435 2xl:w-594 2xl:497 rounded-lg overflow-hidden bg-white`}>
              <div className="w-full h-full" />
            </div>
          </div>
        </MainThumb>
      </section>
      <section className="mb-24">
        <MainThumb title="Point 2" desc="해야 할 일을" desc2="등록하세요">
          <div className="flex flex-row justify-center">
            <div className={`w-217 h-250 md:w-360 md:h-415 2xl:w-436 2xl:502 rounded-lg overflow-hidden bg-white`}>
              <div className="w-full h-full" />
            </div>
          </div>
        </MainThumb>
      </section>
      <section className="mb-32">
        <div className="mb-10 text-center">
          <span className="text-xl">생산성을 높이는 다양한 설정 ⚡ </span>
        </div>
        <div>
          <div className="mb-10">
            <MiniThumb title="대시보드" desc="대시보드 사진과 이름을 변경할 수 있어요." />
          </div>
          <div className="mb-10">
            <MiniThumb title="초대" desc="새로운 팀원을 초대할 수 있어요." />
          </div>
          <div>
            <MiniThumb title="구성원" desc="구성원을 초대하고 내보낼 수 있어요."/>
          </div>
        </div>
      </section>
    </div>
  );
}