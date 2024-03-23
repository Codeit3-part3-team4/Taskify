'use client';

import Link from 'next/link';

export default function notFound() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="flex flex-col items-center">
      <img className="m-7" src="/images/mokoko-stop.png" alt="페이지를 찾을 수 없습니다" />
      <h2 className="text-4xl mb- 7">페이지를 찾을 수 없습니다.</h2>
      <div className="m-7 w-96 text-center">
        <p>
          찾으시려는 페이지의 주소가 잘못 입력되었거나, 페이지 주소의 변경 혹은 삭제로 인해 현재 사용하실 수 없습니다. 입력하신 페이지의 주소가 정확한지 다시
          한번 확인 해 주시길 부탁 드립니다.
        </p>
      </div>
      <div className="flex gap-5 ">
        <button className="w-44 h-14 border border-gray_D9D9D9 rounded-lg text-purple-760DDE hover:bg-gray-D9D9D9" type="button" onClick={handleGoBack}>
          이전 페이지
        </button>
        <Link href="/">
          <button className="w-44 h-14 border border-gray_D9D9D9 rounded-lg bg-purple-760DDE hover:bg-primary-BASIC text-white" type="button">
            메인으로 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
