'use client'

import React, { useEffect, useRef, useState } from 'react'
import StageFive from '@/app/components/_about/StageContainer/Stage/StageFive'
import StageFour from '@/app/components/_about/StageContainer/Stage/StageFour'
import StageOne from '@/app/components/_about/StageContainer/Stage/StageOne'
import StageThree from '@/app/components/_about/StageContainer/Stage/StageThree'
import StageTwo from '@/app/components/_about/StageContainer/Stage/StageTwo'
import ScrollIcon from './ScrollIcon'
import FireworkAnimation from '../../common/Animation/FireworkAnimation'

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
      {!showScrollIcon && <FireworkAnimation />}
      <StageOne />
      <StageTwo />
      <StageThree />
      <StageFour />
      <StageFive />
    </div>
  )
}
