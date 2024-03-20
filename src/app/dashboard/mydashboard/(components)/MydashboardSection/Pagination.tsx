import Image from 'next/image';

const ITEMS_PER_PAGE = 7;

interface Pagination {
  count: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ count, page, setPage }: Pagination) {
  const maxPage = Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));

  const handlePrevPageClick = () => {
    setPage(page - 1);
  };

  const handleNextPageClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="flex items-center">
      <div className="mr-4">
        <span>
          {page}/{maxPage}
        </span>
      </div>
      <div className="flex">
        <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
          <button
            className="flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group"
            disabled={page === 1}
            onClick={handlePrevPageClick}
          >
            <Image src="/images/arrow-forward-left.svg" alt="전 페이지 이동" width={18} height={18} />
          </button>
        </div>
        <div className="flex flex-row rounded-md gap-[1px] border border-gary-D9D9D9 bg-gray-D9D9D9 overflow-hidden">
          <button
            className="flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group"
            disabled={page === maxPage}
            onClick={handleNextPageClick}
          >
            <Image src="/images/arrow-forward-right.svg" alt="다음 페이지 이동" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
