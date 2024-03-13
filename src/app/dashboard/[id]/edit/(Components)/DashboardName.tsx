"use client"

import { getDashboardDetailsApi, putDashboardDetailsApi } from "@/api/dashboardsApi";
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputTitle = (event.currentTarget.elements.namedItem("title") as HTMLInputElement).value;  
    const result = await putDashboardDetailsApi(4570, inputTitle, color);
    
    setColor(result.color);
    setTitle(result.title);
  }

  useEffect(() => {
    getDashboardDetails().then((res) => {
      if(res === null) return;
      setColor(res.color);
      setTitle(res.title);
    });
  }, [])

  return (
    <form className="flex flex-col rounded-md p-5 bg-white" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between items-center mb-6">
        <strong className="text-xl">{title}</strong>
        <div className="flex flex-row items-center gap-1">{colorList.map((item) => {
          return (
            <button className="flex justify-center items-center w-7 h-7 rounded-full" style={{ backgroundColor: item }} onClick={() => onClickColor(item)}>
               {item === color && <Image src="/images/crown-icon.svg" width="16" height="16" alt="checker" />}
            </button>
          )
        })}
          <input className="bg-transparent w-20 h-9" name="color"  type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </div>
      <strong className="mb-3">대시보드 이름</strong>
      <div className="w-full h-12 px-4 rounded-md bg-white outline outline-1 outline-gray-300/50 mb-4">
        <input className="w-full h-full focus:outline-none" name="title" type="text" />
      </div>
      <div className="flex flex-row justify-end">
        <button className="flex flex-row justify-center items-center w-20 h-8 bg-violet-5534DA text-white text-xs rounded-md"
          type="submit">변경</button>
      </div>
    </form>
  )
}