import React from 'react'
import StoreList from './StoreList/StoreList'
import StoreSearch from './StoreSearch/StoreSearch'
import { HotPlaceListingType } from '@/interfaces/interface'

interface SideInfoProps {
  hotPlaceListings?: HotPlaceListingType[]
  isPending: boolean
  searchKeyword: string
  showSideInfo: boolean
}

export default function SideInfo({
  hotPlaceListings,
  isPending,
  searchKeyword,
  showSideInfo,
}: SideInfoProps) {
  return (
    <div
      className={`absolute right-0 top-[82px] z-10 hidden h-[calc(100%-102px)] w-[320px] overflow-y-scroll bg-white p-4 duration-300 md:top-[102px] md:block ${
        showSideInfo ? 'translate-x-0' : 'translate-x-[100%]'
      }`}
    >
      <StoreSearch searchKeyword={searchKeyword} />
      <StoreList
        hotPlaceListings={hotPlaceListings}
        isPending={isPending}
        searchKeyword={searchKeyword}
      />
    </div>
  )
}
