import Image from 'next/image';

interface HeaderProps {
  theme: 'light' | 'dark';
}

export default function Header({ theme }: HeaderProps) {
  return (
    <nav
      className={`flex flex-row justify-between items-center p-4 mb-10 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="relative w-6 h-6 md:w-9 md:h-9">
        <Image src={ `${theme === 'dark' ? '/images/taskify-logo-dark.svg' : '/images/taskify-logo-light.svg'}`} alt="Taskify" width="35" height="35"/>
      </div>
      <div
        className={`flex flex-row justify-between gap-4 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'} md:text-base`}
      >
        <span>로그인</span>
        <span>회원가</span>
      </div>
    </nav>
  );
}
