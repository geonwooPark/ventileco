import React, { useEffect } from 'react'
import StoreListItem from './StoreListItem'
import SkeletonStoreList from './SkeletonStoreList'
import { useMap } from '@/hooks/store/useMapStore'
import { INITIAL_CENTER } from '@/constants'
import { HotPlaceListingType } from '@/interfaces/interface'

interface StoreListProps {
  hotPlaceListings?: HotPlaceListingType[]
  isPending: boolean
  searchKeyword: string
}

export default function StoreList({
  hotPlaceListings,
  isPending,
  searchKeyword,
}: StoreListProps) {
  const map = useMap()

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
  if (!hotPlaceListings || hotPlaceListings?.length === 0)
    return (
      <div className="mt-10 text-center text-gray-400">
        검색결과가 없어요!😥
      </div>
    )

  return (
    <ul className="card-shadowed rounded-md bg-beige-light text-brown-dark">
      {hotPlaceListings?.map((hotPlaceListing) => (
        <StoreListItem
          key={hotPlaceListing._id}
          hotPlaceListing={hotPlaceListing}
        />
      ))}
    </ul>
  )
}
