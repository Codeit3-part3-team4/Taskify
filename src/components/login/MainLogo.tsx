import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo({ title }) {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Link href={'/'}>
        <Image src="/images/taskify-logo-main.svg" alt="메인 로고" width={200} height={279} className="w-120 h-167.4" />
      </Link>
      <div className="font-semibold">{title}</div>
    </div>
  );
}

/*
w md:w lg


 */
