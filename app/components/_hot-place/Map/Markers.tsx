'use client'

import { useMap } from '@/hooks/store/useMapStore'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'
import { MARKER_SIZE, StoreCategory } from '@/constants'
import { HotPlaceListingType } from '@/interfaces/interface'

interface MarkersProps {
  hotPlaceListings?: HotPlaceListingType[]
}

const getSpriteOrigin = (category: string) => {
  if (category === '한식') return MARKER_SIZE * 0
  if (category === '일식') return MARKER_SIZE * 1
  if (category === '중식') return MARKER_SIZE * 2
  if (category === '양식') return MARKER_SIZE * 3
  if (category === '분식') return MARKER_SIZE * 4
  if (category === '카페') return MARKER_SIZE * 5
}

export default function Markers({ hotPlaceListings }: MarkersProps) {
  const map = useMap()
  // const searchKeyword = useSearchKeyword()
  const router = useRouter()

  const [markers, setMarkers] = useState<any[]>([])
  // const { hotPlaceListings } = useHotPlaceListings(searchKeyword)

  const zoomIn = () => {
    const level = map.getLevel()
    if (level > 4) {
      map.setLevel(4)
    }
  }

  const setCenter = (latitude: number, longitude: number) => {
    const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude)
    map.setCenter(moveLatLon)
  }

  useEffect(() => {
    if (!map) return
    if (!hotPlaceListings || hotPlaceListings.length === 0) return

    if (markers) {
      markers.forEach((marker) => marker.setMap(null))
    }
    window.kakao.maps.load(async () => {
      let markers: any[] = []
      const imageSrc = 'svgs/store-category.svg'
      const imageSize = new window.kakao.maps.Size(MARKER_SIZE, MARKER_SIZE)

      for (let i = 0; i < hotPlaceListings.length; i++) {
        const {
          category,
          _id,
          coordinate: { latitude, longitude },
        } = hotPlaceListings[i]

        const imageOption = {
          spriteSize: new window.kakao.maps.Size(
            MARKER_SIZE * StoreCategory.length,
            MARKER_SIZE,
          ), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(
            getSpriteOrigin(category),
            0,
          ),
        }
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        )
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(latitude, longitude),
          image: markerImage,
        })
        markers = [...markers, marker]
        window.kakao.maps.event.addListener(marker, 'click', function () {
          router.push(`/hot-place/store/${_id}`)
          zoomIn()
          setCenter(latitude, longitude)
        })
      }
      setMarkers(markers)
    })
  }, [map, hotPlaceListings])

  return <div></div>
}
