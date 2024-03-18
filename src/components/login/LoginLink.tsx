import Link from 'next/link';

export default function LoginLink({ sentence, linktitle, link }) {
  return (
    <div>
      {sentence}
      <Link href={link}>{linktitle}</Link>
    </div>
  );
}
