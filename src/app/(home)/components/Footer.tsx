import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center text-gray-400 md:flex-row md:justify-between md:px-10 md:h-24 2xl:px-36">
      <div className="mb-3 text-gray_9FA6B2 md:mb-0">
        <span>@codeit - 2023</span>
      </div>
      <div className="flex mb-16 gap-5 text-gray_9FA6B2 md:mb-0">
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <div className="flex flex-row justify-center gap-5 mb-24 md:mb-0 md:gap-4">
        <Image src="/images/mail.svg" alt="mail" width={18} height={18} />
        <Image src="/images/facebook.svg" alt="facebook" width={18} height={18} />
        <Image src="/images/instagram.svg" alt="instagram" width={18} height={18} />
      </div>
    </footer>
  );
}
