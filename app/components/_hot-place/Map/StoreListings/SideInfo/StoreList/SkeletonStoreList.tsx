import React from 'react'

export default function SkeletonStoreList() {
  return (
    <ul>
      {Array.from({ length: 7 })?.map((_, i) => (
        <li
          key={i}
          className="animate-pulse cursor-pointer p-2 duration-100 last:mb-0 hover:bg-white/80"
        >
          <div className="flex gap-4">
            <div className="relative h-[60px] w-[90px] bg-slate-300"></div>
            <div className="w-full">
              <div className="mb-0.5 h-5 w-[70%] rounded-md bg-slate-300"></div>
              <div className="h-4 w-[30%] rounded-md bg-slate-300"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
