import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardBack() {
  const header = headers();
  const pathnames = header.get('x-pathname')?.split('/');

  if (pathnames === undefined) return;
  const newPath = `/${pathnames[1]}/${pathnames[2]}`;

  return (
    <>
      <div className="flex flex-row items-center">
        <Link href={{ pathname: newPath }}>
          <div className="flex flex-row">
            <Image src="/images/arrow-forward-left.svg" width="18" height="18" alt="arrow-left" />
            <strong className="text-sm">돌아가기</strong>
          </div>
        </Link>
      </div>
    </>
  );
}
