import DashboardMaker from '@/app/dashboard/mydashboard/(components)/DashboarderMaker/Dashboardmaker';
import Modal from './Modal';

export default function AddDashboardModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: (b: boolean) => void;
}) {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="새로운 대시보드">
      <DashboardMaker setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
}
