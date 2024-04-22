'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import DashedBox from '../common/DashedBox'
import bg from '../../../public/images/bg.png'

export default function BackgroundImage() {
  useEffect(() => {
    const toScroll = (e: WheelEvent) => {
      e.preventDefault()

      if (e.deltaY < 0) {
        if (window.scrollY === 0) return

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      } else {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight)
          return

        window.scrollTo({
          top: window.innerHeight - 56,
          left: 0,
          behavior: 'smooth',
        })
      }
    }

    window.addEventListener('wheel', toScroll, {
      passive: false,
    })

    return () => {
      window.removeEventListener('wheel', toScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[-10] h-full w-full">
      <Image
        src={bg}
        alt="bg"
        priority
        fill
        placeholder="blur"
        className="h-full w-full object-cover opacity-50"
      />
      <DashedBox />
    </div>
  )
}
