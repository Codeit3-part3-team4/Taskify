import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-white">
      <section className="flex flex-col items-center mb-20 vertical-middle text-center align-middle">
        <div className="mb-10">
          <Image src="/images/add.svg" alt="thumb" width="287" height="168" />
        </div>
        <div className="flex flex-col items-center text-4xl letter leading-10 gap-1">
          <strong className="mb-3">새로운 일정 관리</strong>
          <strong className="text-5xl text-violet-500/90 mb-5 leading-12">Taskify</strong>
        </div>
        <div className="text-xs mb-20">서비스의 메인 설명 들어갑니다</div>
        <div className="flex justify-center items-center rounded-lg w-60 h-11 bg-violet-500/90">
          <button className="w-full h-full">로그인하기</button>
        </div>
      </section>
      <section className="flex flex-col justify-between w-[340px] h-[686px] rounded-lg overflow-hidden mb-16 bg-gray-300/10">
        <div className="flex flex-col items-center mt-16">
          <span className="text-lg text-gray-400 mb-20">Point 1</span>
          <strong className="text-3xl text-center">일의 우선순위를<br/>관리하세요</strong>
        </div>
        <div className="flex flex-row justify-end">
          <Image src="/images/add.svg" alt="thumb" width="287" height="168" />
        </div>
      </section>
      <section className="flex flex-col justify-between w-[340px] h-[686px] rounded-lg overflow-hidden mb-24 bg-gray-300/10">
        <div className="flex flex-col items-center mt-16">
          <span className="text-lg text-gray-400 mb-20">Point 2</span>
          <strong className="text-3xl text-center">해야 할 일을<br/>등록하세요</strong>
        </div>
        <div className="flex flex-row justify-end">
          <Image src="/images/add.svg" alt="thumb" width="287" height="168" />
        </div>
      </section>
      <section className="mb-32">
        <div className="text-xl text-center mb-10">생산성을 높이는 다양한 설정 ⚡ </div>
        <div>
          <div className="mb-10 w-[340px] h-[340px] rounded-lg overflow-hidden ">
            <div className="flex justify-center items-center w-full h-2/3 bg-gray-300/40">
              <div className="w-64 h-24 rounded-lg overflow-hidden bg-white"></div>
            </div>
            <div className="flex flex-col justify-between w-full h-1/3 bg-gray-500/40 px-5 py-7">
              <strong className="text-base">대시보드 설정</strong>
              <div className="text-sm">대시보드 사진과 이름을 변경할 수 있어요.</div>
            </div>
          </div>
          <div className="mb-10 w-[340px] h-[340px] rounded-lg overflow-hidden ">
            <div className="flex justify-center items-center w-full h-2/3 bg-gray-300/40">
              <div className="w-64 h-48 rounded-lg overflow-hidden bg-white"></div>
            </div>
            <div className="flex flex-col justify-between w-full h-1/3 bg-gray-500/40 px-5 py-7">
              <strong className="text-base">초대</strong>
              <div className="text-sm">새로운 팀원을 초대할 수 있어요.</div>
            </div>
          </div>
          <div className="w-[340px] h-[340px] rounded-lg overflow-hidden ">
            <div className="flex justify-center items-center w-full h-2/3 bg-gray-300/40">
              <div className="w-64 h-40 rounded-lg overflow-hidden bg-white"></div>
            </div>
            <div className="flex flex-col justify-between w-full h-1/3 bg-gray-500/40 px-5 py-7">
              <strong className="text-base">구성원</strong>
              <div className="text-sm">구성원을 초대하고 내보낼 수 있어요.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}