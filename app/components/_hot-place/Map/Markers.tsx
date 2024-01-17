'use client'

import { useMap } from '@/hooks/store/useMapStore'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useHotPlaceListings from '@/hooks/query/useHotPlaceListings'
import { useSearchKeyword } from '@/hooks/store/useSearchKeywordStore'

export default function Markers() {
  const map = useMap()
  const searchKeyword = useSearchKeyword()
  const router = useRouter()

  const [markers, setMarkers] = useState<any[]>([])
  const { hotPlaceListings } = useHotPlaceListings(searchKeyword)

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
      // // 마커가 표시될 위치입니다
      // const markerPosition = new window.kakao.maps.LatLng(37.574187, 126.976882)
      // // 마커를 생성합니다
      // const marker = new window.kakao.maps.Marker({
      //   position: markerPosition,
      // })
      // // 마커가 지도 위에 표시되도록 설정합니다
      // marker.setMap(map)
      // const normalImage = new window.kakao.maps.MarkerImage(
      //   marker,
      //   new window.kakao.maps.Size(48, 48),
      // )
      // const clickImage = new window.kakao.maps.MarkerImage(
      //   selectedMarker,
      //   new window.kakao.maps.Size(48, 48),
      // )
      let markers: any[] = []
      for (let i = 0; i < hotPlaceListings.length; i++) {
        const { latitude, longitude } = hotPlaceListings[i].coordinate
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(latitude, longitude),
        })
        markers = [...markers, marker]
        window.kakao.maps.event.addListener(marker, 'click', function () {
          router.push(`/hot-place/store/${hotPlaceListings[i]._id}`)
          zoomIn()
          setCenter(latitude, longitude)
        })
      }
      setMarkers(markers)
    })
  }, [map, hotPlaceListings])

  return <div></div>
}
