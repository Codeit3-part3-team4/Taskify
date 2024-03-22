import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo({ title }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={'/'}>
        <Image src="/images/taskify-logo-main.svg" alt="메인 로고" width={120} height={167.4} className=" md:w-[200px] md:h-[279px]" />
      </Link>
      <div className="font-semibold leading-[23.87px] mt-[8px]">{title}</div>
    </div>
  );
}

/**
 * mt-[108px] md:mt-[0px] lg:mt-[153px]
 */
