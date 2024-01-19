import React from 'react'
import StoreList from './StoreList/StoreList'
import StoreSearch from './StoreSearch/StoreSearch'

export default function SideInfo() {
  return (
    <div className="absolute right-0 top-[82px] z-10 hidden h-[calc(100%-82px)] w-[320px] overflow-y-scroll bg-white/60 p-4 md:top-[102px] md:block md:h-[calc(100%-102px)]">
      <StoreSearch />
      <StoreList />
    </div>
  )
}
