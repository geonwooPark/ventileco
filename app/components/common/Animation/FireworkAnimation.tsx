'use client'

import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '../../../../public/animation/firework-animation.json'
import {
  useFireWorkActions,
  useFireWorkIsOpen,
} from '@/hooks/store/useFireWorkStore'

export default function Firework() {
  const isOpen = useFireWorkIsOpen()
  const { onClose } = useFireWorkActions()

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000)
    return () => clearTimeout(timer)
  }, [isOpen])

  if (!isOpen) return

  return (
    <div className={`fixed inset-0 z-50 h-screen w-screen`}>
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        className="h-full w-full"
      />
    </div>
  )
}
