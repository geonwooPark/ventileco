'use client'

import { useMap } from '@/hooks/store/useMapStore'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MARKER_SIZE, StoreCategory, spriteOrigin } from '@/constants'
import { HotPlaceListingType } from '@/interfaces/interface'

interface MarkersProps {
  hotPlaceListings?: HotPlaceListingType[]
}

export default function Markers({ hotPlaceListings }: MarkersProps) {
  const map = useMap()
  const router = useRouter()

  const [markers, setMarkers] = useState<any[]>([])

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
    if (!hotPlaceListings) return

    if (markers) {
      markers.forEach((marker) => marker.setMap(null))
    }
    window.kakao.maps.load(async () => {
      let markers: any[] = []
      const imageSrc = `${process.env.NEXT_PUBLIC_FE_URL}/svgs/StoreCategory.svg`
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
          spriteOrigin: new window.kakao.maps.Point(spriteOrigin[category], 0),
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
