'use client'

import React, { useState } from 'react'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'
import Markers from './Markers'
import SideInfoButton from './SideInfoButton'
import SideInfo from './SideInfo/SideInfo'

export default function StoreListings() {
  const searchKeyword = useSearchKeyword()
  const { hotPlaceListings, isPending } = useHotPlaceListings(searchKeyword)

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
