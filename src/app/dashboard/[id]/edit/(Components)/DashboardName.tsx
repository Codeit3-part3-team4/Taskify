"use client"

import { getDashboardDetailsApi } from "@/api/dashboardsApi";
import Image from "next/image";
import { useEffect, useState } from "react";

const colorList: string[] = ["#7AC555", "#760DDE", "#76A5EA", "#E876EA", "#FFA500"]

const getDashboardDetails = async () => {
  const dashboardId = 4570;
  return await getDashboardDetailsApi(dashboardId);
}

export default function DashboardName() {
  const [color, setColor] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const onClickColor = (color: string) => {
    setColor(color);
  }

  useEffect(() => {
    getDashboardDetails().then((res) => {
      if(res === null) return;
      setColor(res.color);
      setTitle(res.title);
    });
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mb-6">
        <strong>{title}</strong>
        <div className="flex flex-row gap-1">{colorList.map((item) => {
          return (
            <button className="flex justify-center items-center w-7 h-7 rounded-full" style={{ backgroundColor: item }} onClick={() => onClickColor(item)}>
               {item === color && <Image src="/images/crown-icon.svg" width="15" height="15" alt="checker" />}
            </button>
          )
        })}</div>
      </div>
      <div className="mb-2">대시보드 이름</div>
      <div className="w-full h-12 px-4 rounded-md outline outline-1 outline-gray-300/50 mb-4">
        <input className="w-full h-full focus:outline-none" />
      </div>
      <div className="flex flex-row justify-end">
        <button className="flex flex-row justify-center items-center w-20 h-8 bg-violet_5534DA text-white text-sm font-semibold rounded-md">변경</button>
      </div>
    </div>
  )
}