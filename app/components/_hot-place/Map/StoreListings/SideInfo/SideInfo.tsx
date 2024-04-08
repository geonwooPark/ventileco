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
      className={`hide-scroll absolute right-0 z-10 hidden h-full w-[320px] overflow-y-scroll bg-brown-dark pb-4 pl-4 duration-300 md:block ${
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
