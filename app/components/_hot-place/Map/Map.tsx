'use client'

import { useMapActions } from '@/hooks/store/useMap'
import React, { useEffect, useRef } from 'react'
// import Markers from './Markers'

export default function Map() {
  const { onAdd: addMap } = useMapActions()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const options = {
        center: new window.kakao.maps.LatLng(37.574187, 126.976882),
        level: 5,
      }
      const map = new window.kakao.maps.Map(container.current, options)
      addMap(map)
    })
  }, [])

  return (
    <div ref={container} className="h-full w-full">
      {/* <Markers /> */}
    </div>
  )
}
