'use client';

import Image from 'next/image';

export default function Footer() {
  const onClick = () => {
    window.open('https://github.com/Codeit3-part3-team4/Taskify', '_blank');
  };

  return (
    <footer className="flex flex-col justify-center items-center text-gray-400 md:flex-row md:justify-between md:px-10 md:h-24 2xl:px-36 bg-black ">
      <div className="mb-3 text-gray_9FA6B2 md:mb-0">
        <span>@codeit - 2023</span>
      </div>
      <div className="flex mb-16 gap-5 text-gray_9FA6B2 md:mb-0">
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <div className="flex flex-row justify-center gap-5 mb-24 md:mb-0 md:gap-4">
        <div className="bg-white w-9 h-9 rounded cursor-pointer" onClick={onClick}>
          <Image className="w-full h-full" src="/images/github.png" alt="twitter" width={36} height={36} />
        </div>
      </div>
    </footer>
  );
}
