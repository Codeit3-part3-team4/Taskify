'use client';
import React from 'react';

export default function Card() {
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col m-auto w-72 bg-white items-center pt-3 pb-3 rounded-lg border-slate-300">
          <div>
            {/* {imageUpload && ( */}
            <img
              className="w-64"
              alt="Upload-image"
              src="/images/upload-image.svg"
            />
            {/* )} */}
            <div className="w-64 pt-3">
              <div>
                <div className="text-sm font-medium leading-4 pb-1.5">
                  새로운 일정 관리 Taskify
                </div>
                <div className="bg-lime-100 text-lime-400 w-9 rounded-md py-1 px-1.5 pt-1.5 pb-1.5 text-xs text-center leading-3">
                  일반
                </div>
              </div>
              <div className="flex w-64 justify-between">
                <div className="flex w-16 gap-1 items-center pt-1.5">
                  <img src="/images/calendar-icon.svg" alt="캘린더 아이콘" />
                  <div className="text-xs text-slate-400">2022.12.31</div>
                </div>
                <div className="text-center items-center">
                  <div className="w-6 h-6 bg-emerald-800 opacity-40 rounded-full text-white text-xs font-semibold">
                    B
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
