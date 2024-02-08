'use client'

import React, { useEffect, useRef, useState } from 'react'
import StageFive from '@about/Stage/StageFive'
import StageFour from '@about/Stage/StageFour'
import StageOne from '@about/Stage/StageOne'
import StageThree from '@about/Stage/StageThree'
import StageTwo from '@about/Stage/StageTwo'
import ScrollIcon from './ScrollIcon'

export default function StageContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollIcon, setShowScrollIcon] = useState(true)

  let stage
  let isScrolling = false
  useEffect(() => {
    const screenHeight = window.innerHeight

    const toScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return
      const { scrollTop } = containerRef.current!

      isScrolling = true
      if (e.deltaY < 0) {
        stage = Math.floor((scrollTop + 150) / screenHeight) - 1

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage < 4) setShowScrollIcon(true)
      } else {
        stage = Math.floor(scrollTop / screenHeight) + 1

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage >= 4) setShowScrollIcon(false)
      }
      setTimeout(() => (isScrolling = false), 1500)
    }

    containerRef.current?.addEventListener('wheel', toScroll, {
      passive: false,
    })
    return () => {
      containerRef.current?.removeEventListener('wheel', toScroll)
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
