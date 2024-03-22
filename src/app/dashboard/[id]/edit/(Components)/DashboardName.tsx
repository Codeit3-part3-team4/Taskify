'use client';

import { getDashboardDetailsApi, putDashboardDetailsApi } from '@/api/dashboardsApi';
import ColorPicker from '@/app/dashboard/mydashboard/(components)/DashboarderMaker/ColorPicker';
import { MediaQueryType, useMediaQuery } from '@/components/hooks/useMediaQuery';
import { DashboardContext } from '@/context/DashboardContext';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

const colorList: string[] = ['#7AC555', '#760DDE', '#76A5EA', '#E876EA', '#FFA500'];

const getDashboardDetails = async (dashboardId: string) => {
  return await getDashboardDetailsApi(Number(dashboardId));
};

export default function DashboardName({ dashboardId }: { dashboardId: string }) {
  const [color, setColor] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mediaQuery = useMediaQuery();
  const { refresh, setRefresh } = useContext(DashboardContext);

  const onClickColor = (color: string) => {
    setColor(color);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputTitle = (event.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
    const result = await putDashboardDetailsApi(Number(dashboardId), inputTitle, color);

    setColor(result.color);
    setTitle(result.title);
    setRefresh(!refresh);
  };

  useEffect(() => {
    setIsLoading(true);
    getDashboardDetails(dashboardId).then(res => {
      setIsLoading(false);
      if (res === null) return;
      setColor(res.color);
      setTitle(res.title);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center h-44 items-center">
        <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  return (
    <form className="flex flex-col rounded-md p-5 bg-white/50" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-row gap-2">
          <button className="flex justify-center items-center w-7 h-7 rounded-full" style={{ backgroundColor: color }} />
          <strong className="text-xl">{title}</strong>
        </div>
        <div className="flex flex-row items-center gap-1">
          {mediaQuery !== MediaQueryType.MOBILE &&
            colorList.map(item => {
              return (
                <button
                  type="button"
                  className="flex justify-center items-center w-7 h-7 rounded-full"
                  style={{ backgroundColor: item }}
                  onClick={() => onClickColor(item)}
                />
              );
            })}
          <ColorPicker setSelectedColor={color => setColor(color)} />
        </div>
      </div>
      <strong className="mb-3">대시보드 이름</strong>
      <div className="w-full h-12 px-4 rounded-md bg-white/50 outline outline-1 outline-gray-300/50 mb-4">
        <input className="w-full h-full focus:outline-none" name="title" type="text" />
      </div>
      <div className="flex flex-row justify-end">
        <button
          className="flex flex-row justify-center items-center w-20 h-8 bg-primary-BASIC text-white text-xs rounded-md transition-all hover:scale-105"
          type="submit"
        >
          변경
        </button>
      </div>
    </form>
  );
}
