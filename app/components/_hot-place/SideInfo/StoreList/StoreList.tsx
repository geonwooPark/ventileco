'use client'

import React from 'react'
import StoreListItem from './StoreListItem'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'

export default function StoreList() {
  const { hotPlaceListings, isPending } = useHotPlaceListings()
  if (isPending) <div>로딩중...</div>

  return (
    <ul>
      {hotPlaceListings?.map((hotPlaceListing) => (
        <StoreListItem
          key={hotPlaceListing._id}
          hotPlaceListing={hotPlaceListing}
        />
      ))}
    </ul>
  )
}
