import React from 'react'
import StoreList from './StoreList/StoreList'

export default function SideInfo() {
  return (
    <div className="absolute right-0 top-[82px] z-10 hidden h-[calc(100%-82px)] w-[320px] overflow-y-scroll bg-white/60 py-2 md:top-[102px] md:block md:h-[calc(100%-102px)]">
      <StoreList />
    </div>
  )
}
