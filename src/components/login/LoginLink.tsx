import Link from 'next/link';

export default function LoginLink({ sentence, linktitle, link }) {
  return (
    <div className="flex gap-2">
      {sentence}
      <Link href={link}>{linktitle}</Link>
    </div>
  );
}
