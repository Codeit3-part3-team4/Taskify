import Link from 'next/link';

export default function LoginLink({ sentence, linktitle, link }) {
  return (
    <div className="flex gap-2 text-base leading-[19px]">
      {sentence}
      <span className="underline underline-offset-2 text-primary-BASIC">
        <Link href={link}>{linktitle}</Link>
      </span>
    </div>
  );
}
