import type { Metadata } from 'next';
import { Gamja_Flower } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Gamja_Flower({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskiMo',
  description: '새로운 일정 관리 TaskiMo로 시작하세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = '/images/mokoko-bg.png';

  return (
    <html lang="ko">
      <body className={`${inter.className}`}>
        <div
          className="absolute top-0 left-0 w-screen h-screen opacity-30 -z-10"
          style={{ backgroundImage: `url(${url})`, opacity: '0.3', backgroundSize: 'cover', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}
        />
        {children}
      </body>
    </html>
  );
}
