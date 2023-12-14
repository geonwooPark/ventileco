import React from 'react'

export default function SkeletonWeatherInfo() {
  return (
    <div className="flex w-full -translate-y-2 animate-pulse flex-col items-center">
      <div className="mb-4 h-[100px] w-[100px] rounded-full bg-slate-500" />

      <div className="mb-3 flex flex-1 flex-col items-center rounded-md">
        <div className="mb-1.5 h-4 w-24 rounded-md bg-slate-500"></div>
        <div className="mb-1.5 h-12 w-[60px] rounded-md bg-slate-500"></div>
        <div className="h-4 w-[120px] rounded-md bg-slate-500"></div>
      </div>

      <div className="h-5 w-20 rounded-md bg-slate-500"></div>
    </div>
  )
}
