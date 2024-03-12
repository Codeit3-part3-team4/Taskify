import Image from "next/image";

export default function DashboardBack() {
  return (
    <>
      <div className="flex flex-row items-center">
        <button>
          <Image src="/images/arrow-forward-left.svg" width="18" height="18" alt="arrow-left" />
        </button>
        <span>돌아가기</span>
      </div>
    </>
  )
}