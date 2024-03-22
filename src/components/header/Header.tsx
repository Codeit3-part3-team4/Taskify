import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  theme: 'light' | 'dark';
}

export default function Header({ theme }: HeaderProps) {
  return (
    <nav className={` flex flex-row justify-between items-center py-4 ${theme === 'dark' ? 'bg-black' : 'bg-blue-87CEFA'} md:py-6`}>
      <div className="relative flex flex-row w-6 h-7 ml-6 md:w-9 md:h-9 md:ml-9">
        <Image src={`${theme === 'dark' ? '/images/taskify-logo-dark.svg' : '/images/taskify-logo-light.svg'}`} alt="Taskify" width="35" height="35" />
        <span className="hidden text-3xl text-white md:block">Taskify</span>
      </div>
      <div className={`flex flex-row justify-between gap-4 mr-6 ${theme === 'dark' ? 'text-white' : 'text-white'} md:text-lg md:gap-8 md:px-10 2xl:px-20`}>
        <Link href={{ pathname: '/login' }}>
          <span className="text-xl cursor-pointer">로그인</span>
        </Link>
        <Link href={{ pathname: '/signup' }}>
          <span className="text-xl cursor-pointer">회원가입</span>
        </Link>
      </div>
    </nav>
  );
}
