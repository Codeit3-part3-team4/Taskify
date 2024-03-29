'use client';

import Image from 'next/image';
import Canvas3DView from './Canvas3DView';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function Landing() {
  const Title = () => {
    const [operateIndex, setOperateIndex] = useState<number>(0);
    const [degree, setDegree] = useState<number>(0);

    const operateRef = useRef<HTMLDivElement>(null);

    const onClick = () => {
      setOperateIndex((operateIndex + 1) % 3);

      if (operateRef.current !== null) {
        operateRef.current.style.transformOrigin = '40% 40%';

        operateRef.current.style.transform = `rotate(${degree + 120}deg)`;
        setDegree(degree + 120);
      }
    };
    const loginOpacity = operateIndex === 2 ? 'opacity-100' : 'opacity-0';

    return (
      <div className="flex flex-col items-center vertical-middle text-center align-middle md:mb-44">
        <div className="relative mb-10">
          <div className="w-[450px] h-[300px] rounded-lg overflow-hidden bg-white md:w-[720px] md:h-[480px] 2xl:w-[1200px] 2xl:h-[800px]">
            <Canvas3DView operateIndex={operateIndex} />
            <div className={`absolute top-full left-full w-9 h-9 text-begie-500 transition-all transform`} onClick={onClick} ref={operateRef}>
              <Image className="w-7 h-7 cursor-pointer hover:scale-105" src="/images/refresh.svg" width="36" height="36" alt="refresh" />
            </div>
          </div>
        </div>
        <div className={`flex flex-col items-center letter leading-10 gap-1 md:flex-row md:gap-6 md:mb-6 transition-opacity duration-500 ${loginOpacity}`}>
          <strong className="text-4xl text-white drop-shadow-lg mb-3 md:text-5xl 2xl:text-7xl">새로운 일정 관리</strong>
          <strong className="text-5xl text-primary-BASIC drop-shadow-lg mb-5 leading-12 md:text-6xl 2xl:text-7xl">TaskiMo</strong>
        </div>
        <div className="text-xs mb-20 md:text-sm md:mb-16 2xl:text-base"></div>
        <div className={`rounded-lg w-60 h-11 bg-primary-BASIC md:w-72 transition-opacity duration-500 animate-bounce ${loginOpacity}`}>
          <Link
            className="flex justify-center items-center w-full h-full md:text-lg"
            href={{
              pathname: '/login',
            }}
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  };

  const MainThumb = ({
    title,
    desc,
    desc2,
    options = '',
    children,
  }: {
    title: string;
    desc: string;
    desc2: string;
    options?: string;
    children: React.ReactNode;
  }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const translateObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transform = `translateX(${0}%)`;
          } else {
            (entry.target as HTMLElement).style.transform = `translateX(${100}%)`;
          }
        });
      });
      translateObserver.observe(titleRef.current as Element);

      const opacityObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = `1`;
          } else {
            (entry.target as HTMLElement).style.opacity = `0`;
          }
        });
      });
      opacityObserver.observe(panelRef.current as Element);
    }, []);

    return (
      <div
        className={`flex flex-col 2xl:flex-row justify-between w-343 h-686 rounded-lg overflow-hidden bg-gray-300/10 md:w-664 md:h-972 2xl:w-1200 2xl:h-600 transition-all duration-1000 ${options}`}
        ref={panelRef}
      >
        <div className="flex flex-col w-full items-center md:items-start md:p-14 mt-16 md:mt-0 2xl:pt-32 transition-all duration-1000" ref={titleRef}>
          <span className="text-3xl md:text-5xl text-gray_9FA6B2 mb-20">{title}</span>
          <strong className="text-5xl md:text-7xl text-center md:text-start">
            {desc}
            <br />
            {desc2}
          </strong>
        </div>
        {children}
      </div>
    );
  };

  const MiniThumb = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => {
    return (
      <div className="w-343 h-350 rounded-lg overflow-hidden md:w-378 md:h-384">
        <div className="flex justify-center items-center w-full h-2/3 bg-gray-500/10">{children}</div>
        <div className="flex flex-col justify-center w-full h-1/3 bg-gray-500/40 px-5 gap-4">
          <strong className="text-2xl">{title}</strong>
          <span className="text-xl">{desc}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-[100dvh] text-white overflow-scroll">
      <div className="flex flex-col justify-start items-center w-full h-full ">
        <section className="mt-10 mb-20">
          <Title />
        </section>
        <section className="mb-16 bg-gray-300/50 text-black">
          <MainThumb title="👍 첫번째!!" desc="일의 우선순위를" desc2="관리하세요">
            <div className="flex flex-row justify-end items-end w-full">
              <img className={`w-296 h-248 rounded-lg overflow-hidden bg-white md:w-519 md:h-435 2xl:w-594 2xl:h-497`} src={'/images/thumb_1.png'} />
            </div>
          </MainThumb>
        </section>
        <section className="mb-24 bg-gray-300/50 text-black">
          <MainThumb title="✌ 두번째!!" desc="해야 할 일을" desc2="등록하세요" options="2xl:flex-row-reverse">
            <div className="flex flex-row justify-end items-end w-full 2xl:justify-start">
              <img
                className={`w-217 h-250 rounded-lg overflow-hidden bg-white md:w-360 md:h-415 2xl:w-436 2xl:h-502 2xl:ml-28`}
                src={'/images/thumb_2.png'}
                alt="할 일 이미지"
              />
            </div>
          </MainThumb>
        </section>
        <section className="mb-32 text-black">
          <div className="mb-10 text-center 2xl:text-left">
            <strong className="text-2xl 2xl:text-5xl">생산성을 높이는 다양한 설정 ⚡ </strong>
          </div>
          <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:w-1200">
            <div className="mb-10">
              <MiniThumb title="대시보드" desc="대시보드 사진과 이름을 변경할 수 있어요.">
                <img className="w-64 h-24 rounded overflow-hidden bg-white md:w-72 md:h-32" src={'/images/thumb_3.png'} />
              </MiniThumb>
            </div>
            <div className="mb-10">
              <MiniThumb title="초대" desc="새로운 팀원을 초대할 수 있어요.">
                <img className="w-64 h-48 rounded overflow-hidden bg-white md:w-72 md:h-56" src={'/images/thumb_4.png'} />
              </MiniThumb>
            </div>
            <div>
              <MiniThumb title="구성원" desc="구성원을 초대하고 내보낼 수 있어요.">
                <img className="w-64 h-40 rounded overflow-hidden bg-white md:w-72 md:h-48" src={'/images/thumb_5.png'} />
              </MiniThumb>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
