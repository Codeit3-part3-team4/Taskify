import Image from "next/image";

export default function DashboardBack() {
  return (
    <>
      <div className="flex flex-row items-center">
        <button>
          <Image src="/images/arrow-forward-left.svg" width="18" height="18" alt="arrow-left" />
        </button>
        <strong className="text-sm">돌아가기</strong>
      </div>
    </>
  )
}