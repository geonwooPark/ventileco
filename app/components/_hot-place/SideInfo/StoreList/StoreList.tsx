'use client'

import React, { useEffect } from 'react'
import StoreListItem from './StoreListItem'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import SkeletonStoreList from './SkeletonStoreList'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'
import { useMap } from '@/hooks/store/useMapStore'
import { INITIAL_CENTER } from '@/constants'

export default function StoreList() {
  const map = useMap()
  const searchKeyword = useSearchKeyword()
  const { hotPlaceListings, isPending } = useHotPlaceListings(searchKeyword)

  useEffect(() => {
    if (!map) return
    if (!hotPlaceListings || hotPlaceListings.length === 0) return

    const updateMap = async () => {
      const bounds = new window.kakao.maps.LatLngBounds()
      for (let i = 0; i < hotPlaceListings.length; i++) {
        const { latitude, longitude } = hotPlaceListings[i].coordinate
        bounds.extend(new window.kakao.maps.LatLng(latitude, longitude))
      }
      map.setBounds(bounds)
    }

    window.kakao.maps.load(async () => {
      if (searchKeyword === 'all') {
        const moveLatLon = new window.kakao.maps.LatLng(
          INITIAL_CENTER[0],
          INITIAL_CENTER[1],
        )
        map.setCenter(moveLatLon)
        map.setLevel(7)
        return
      }
      updateMap()
    })
  }, [hotPlaceListings])

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
