import Image from "next/image";

export default function Footer(){
  return (
    <footer className="flex flex-col justify-center items-center text-gray-400">
      <div className="mb-3">
        <span>@codeit - 2023</span>
      </div>
      <div className="mb-16">
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <div className="flex flex-row justify-center gap-5 mb-24">
        <Image src="/images/mail.svg" alt="mail" width={18} height={18} />
        <Image src="/images/facebook.svg" alt="facebook" width={18} height={18} />
        <Image src="/images/instagram.svg" alt="instagram" width={18} height={18} />
      </div>
    </footer>
  );
}