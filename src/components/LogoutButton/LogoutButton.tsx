import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    router.push('/');
  };

  return (
    <button className="btn" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
