import React from 'react'

export default function SkeletonWeatherInfo() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse -translate-y-2">
      <div className="w-[100px] h-[100px] bg-slate-500 rounded-full mb-4" />

      <div className="flex-1 flex flex-col items-center mb-3 rounded-md">
        <div className="w-24 h-4 bg-slate-500 mb-1.5 rounded-md"></div>
        <div className="w-[60px] h-12 bg-slate-500 mb-1.5 rounded-md"></div>
        <div className="w-[120px] h-4 bg-slate-500 rounded-md"></div>
      </div>

      <div className="w-20 h-5 bg-slate-500 rounded-md"></div>
    </div>
  )
}
