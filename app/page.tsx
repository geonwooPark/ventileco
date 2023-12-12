import React from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'

export default function Home() {
  return (
    <div className="h-auto min-h-full py-[82px] md:py-[102px] flex items-center">
      <div className="my-container text-white">
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 mb-5">
          <div className="w-full md:max-w-[280px] h-[300px] bg-slate-700 px-4 py-3 rounded-xl">
            <Weather />
          </div>
          <div className="w-full md:max-w-[280px] h-[300px] bg-slate-700 px-4 py-3 rounded-xl">
            <MyCheckList />
          </div>
        </div>
        <div className="w-full mx-auto max-w-[580px] bg-slate-700 px-4 py-3 rounded-xl">
          <NewArrivals />
        </div>
      </div>
    </div>
  )
}
