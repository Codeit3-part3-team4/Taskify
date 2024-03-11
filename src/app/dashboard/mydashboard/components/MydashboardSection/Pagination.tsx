import Image from 'next/image';

const ITEMS_PER_PAGE = 5;

interface Pagination {
  count: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ count, page, setPage }: Pagination) {
  const maxPage = Math.ceil(count / ITEMS_PER_PAGE);

  const handlePrevPageClick = () => {
    setPage(page - 1);
  };

  const handleNextPageClick = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div>
        <span>
          {page}/{maxPage}
        </span>
      </div>
      <div>
        <button disabled={page === 1} onClick={handlePrevPageClick}>
          <Image
            src="/images/arrow-forward-left.svg"
            alt="전 페이지 이동"
            width={18}
            height={18}
          />
        </button>
        <button disabled={page === maxPage} onClick={handleNextPageClick}>
          <Image
            src="/images/arrow-forward-right.svg"
            alt="다음 페이지 이동"
            width={18}
            height={18}
          />
        </button>
      </div>
    </div>
  );
}
