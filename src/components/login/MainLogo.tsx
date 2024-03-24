import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
}
export default function MainLogo({ title }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={'/'}>
        <Image src="/images/taskify-logo-light.svg" alt="메인 로고" width={120} height={167.4} className="md:w-[200px] md:h-[279px]" />
      </Link>
      <strong className="text-6xl text-primary-BASIC">TaskiMo</strong>
      <div className="font-semibold leading-[23.87px] mt-[8px]">{title}</div>
    </div>
  );
}
