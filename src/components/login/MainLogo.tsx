import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo({ title }) {
  return (
    <div>
      <Link href={'/'}>
        <Image
          src="/images/taskify-logo-main.svg"
          alt="메인 로고"
          width={200}
          height={279}
        />
      </Link>
      <div>{title}</div>
    </div>
  );
}
