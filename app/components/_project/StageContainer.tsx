'use client'

import React, { useEffect, useRef, useState } from 'react'
import StageFive from '@project/Stage/StageFive'
import StageFour from '@project/Stage/StageFour'
import StageOne from '@project/Stage/StageOne'
import StageThree from '@project/Stage/StageThree'
import StageTwo from '@project/Stage/StageTwo'
import ScrollIcon from './ScrollIcon'
import { throttle } from '@/utils/throttle'

export default function StageContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollIcon, setShowScrollIcon] = useState(true)

  let stage: number = 0
  useEffect(() => {
    const screenHeight = window.innerHeight

    const toScroll = (e: WheelEvent) => {
      e.preventDefault()
      const { scrollTop } = containerRef.current!
      const scrollPosition = scrollTop / screenHeight

      if (e.deltaY < 0) {
        if (scrollPosition === 0) return
        stage = Math.floor(scrollTop / screenHeight)

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage < 4) setShowScrollIcon(true)
      } else {
        if (scrollPosition === 4) return
        stage =
          scrollPosition < 4 ? Math.floor(scrollTop / screenHeight) + 1 : 4

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage >= 4) setShowScrollIcon(false)
      }
    }

    containerRef.current?.addEventListener('wheel', throttle(toScroll, 200), {
      passive: false,
    })
    return () => {
      containerRef.current?.removeEventListener(
        'wheel',
        throttle(toScroll, 200),
      )
    }
  }, [])

  return (
    <div
      className="hide-scroll h-full w-full overflow-scroll"
      ref={containerRef}
    >
      {showScrollIcon && <ScrollIcon />}
      <StageOne />
      <StageTwo />
      <StageThree />
      <StageFour />
      <StageFive />
    </div>
  )
}
