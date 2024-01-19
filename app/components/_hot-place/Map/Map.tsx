'use client'

import { useMapActions } from '@/hooks/store/useMapStore'
import React, { useEffect, useRef } from 'react'
import Markers from './Markers'
import { INITIAL_CENTER } from '@/constants'

export default function Map() {
  const { onAdd: addMap } = useMapActions()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const options = {
        center: new window.kakao.maps.LatLng(
          INITIAL_CENTER[0],
          INITIAL_CENTER[1],
        ),
        level: 7,
      }
      const map = new window.kakao.maps.Map(container.current, options)
      addMap(map)
    })
  }, [])

  return (
    <div ref={container} className="h-full w-full">
      <Markers />
    </div>
  )
}
