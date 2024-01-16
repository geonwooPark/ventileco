'use client'

import React from 'react'
import StoreListItem from './StoreListItem'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import SkeletonStoreList from './SkeletonStoreList'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'

export default function StoreList() {
  const searchKeyword = useSearchKeyword()

  const { hotPlaceListings, isPending } = useHotPlaceListings(searchKeyword)
  if (isPending) return <SkeletonStoreList />

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
