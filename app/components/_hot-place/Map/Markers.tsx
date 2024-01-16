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
  const { hotPlaceListings: listings } = useHotPlaceListings(searchKeyword)

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
    if (!listings) return

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
      let selectedMarker: any = null
      for (let i = 0; i < listings.length; i++) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            listings[i].coordinate.latitude,
            listings[i].coordinate.longitude,
          ),
          image: selectedMarker,
        })
        markers = [...markers, marker]
        window.kakao.maps.event.addListener(marker, 'click', function () {
          router.push(`/hot-place/store/${listings[i]._id}`)
          zoomIn()
          setCenter(
            listings[i].coordinate.latitude,
            listings[i].coordinate.longitude,
          )
          if (!selectedMarker || selectedMarker !== marker) {
            selectedMarker && selectedMarker.setImage(marker)
            // marker.setImage(clickImage)
          }
          selectedMarker = marker
        })
      }
      setMarkers(markers)
    })
  }, [map, listings])

  return <div></div>
}
