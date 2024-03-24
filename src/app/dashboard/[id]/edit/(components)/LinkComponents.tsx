import Link from 'next/link';
import { ParsedUrlQueryInput } from 'querystring';

interface LinkImageProps {
  options: string;
  pathname: string;
  query: ParsedUrlQueryInput;
  children: React.ReactNode;
}

export const LinkImage = ({ options, pathname, query, children }: LinkImageProps) => {
  return (
    <Link
      className={`${options} flex flex-row justify-center items-center w-9 h-9 bg-white  active:bg-gray-D9D9D9 group`}
      href={{ pathname: pathname, query: query }}
    >
      {children}
    </Link>
  );
};

export const LinkText = ({ options, pathname, query, children }: LinkImageProps) => {
  return (
    <Link
      className={`${options} flex justify-center items-center h-7 px-3 py-2 rounded border bg-white border-gray-D9D9D9 text-xs text-violet-5534DA hover:bg-gray-D9D9D9`}
      href={{ pathname: pathname, query: query }}
    >
      {children}
    </Link>
  );
};
