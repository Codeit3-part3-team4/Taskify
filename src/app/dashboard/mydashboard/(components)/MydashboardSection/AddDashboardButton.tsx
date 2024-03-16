import { ReactNode } from 'react';

interface AddDashboardButtonProps {
  children?: ReactNode;
  isModalOpen: (is: boolean) => void;
}

export default function AddDashboardButton({ children, isModalOpen }: AddDashboardButtonProps) {
  const handleOpenModal = () => {
    isModalOpen(true);
  };
  return (
    <button onClick={handleOpenModal} className="flex items-center justify-center w-full">
      {children}
    </button>
  );
}
