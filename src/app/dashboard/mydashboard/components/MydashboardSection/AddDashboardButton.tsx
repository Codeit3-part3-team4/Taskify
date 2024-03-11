import Image from 'next/image';

interface AddDashboardButtonProps {
  text: string;
  img: string;
}

export default function AddDashboardButton({
  text,
  img,
}: AddDashboardButtonProps) {
  const handleOpenModal = () => {
    console.log('모달열림');
  };
  return (
    <button onClick={handleOpenModal}>
      <span>{text}</span>
      <Image src={img} alt="대시보드 추가하기" width={16} height={16} />
    </button>
  );
}
