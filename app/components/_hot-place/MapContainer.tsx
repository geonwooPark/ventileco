'use client'

import React from 'react'
import SideInfo from './SideInfo/SideInfo'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'
import Markers from './Map/Markers'

export default function MapContainer() {
  const searchKeyword = useSearchKeyword()
  const { hotPlaceListings } = useHotPlaceListings(searchKeyword)

  return (
    <div>
      <Markers hotPlaceListings={hotPlaceListings} />
      <SideInfo />
    </div>
  )
}
