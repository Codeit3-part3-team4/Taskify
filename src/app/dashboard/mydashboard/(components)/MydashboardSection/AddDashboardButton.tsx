import Image from 'next/image';

interface AddDashboardButtonProps {
  text: string;
  img: string;
  isModalOpen: (is: boolean) => void;
  isSide?: boolean;
}

export default function AddDashboardButton({
  text,
  img,
  isModalOpen,
  isSide,
}: AddDashboardButtonProps) {
  const handleOpenModal = () => {
    isModalOpen(true);
  };
  return (
    <button
      onClick={handleOpenModal}
      className="flex items-center flex justify-center md:justify-between w-full"
    >
      <div className={`${isSide ? 'hidden' : ''} md:block`}>{text}</div>
      <Image src={img} alt="대시보드 추가하기" width={16} height={16} />
    </button>
  );
}
