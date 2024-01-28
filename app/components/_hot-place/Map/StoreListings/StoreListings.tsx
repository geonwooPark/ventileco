'use client'

import React, { useState } from 'react'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import Markers from './Markers'
import SideInfoButton from './SideInfoButton'
import SideInfo from './SideInfo/SideInfo'
import { useHotPlaceFilter } from '@/hooks/store/useHotPlaceFilterStore'

export default function StoreListings() {
  const { keyword: searchKeyword, category, gu } = useHotPlaceFilter()
  const { hotPlaceListings, isPending } = useHotPlaceListings(
    searchKeyword,
    category,
    gu,
  )

  const [showSideInfo, setShowSideInfo] = useState(true)

  return (
    <>
      <Markers hotPlaceListings={hotPlaceListings} />
      <SideInfoButton
        showSideInfo={showSideInfo}
        setShowSideInfo={setShowSideInfo}
      />
      <SideInfo
        hotPlaceListings={hotPlaceListings}
        isPending={isPending}
        searchKeyword={searchKeyword}
        showSideInfo={showSideInfo}
      />
    </>
  )
}
