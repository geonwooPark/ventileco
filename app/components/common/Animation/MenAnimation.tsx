'use client'

import React, { useEffect, useState } from 'react'
import dayjs from '@/app/utils/dayjs'
import Lottie from 'react-lottie-player'
import lottieJson from '@/public/animation/men-animation.json'
import { getSessionStorageWithExpire } from '@/app/utils/getSessionStorageWithExpire'
import { setSessionStorageWithExpire } from '@/app/utils/setSessionStorageWithExpire'

export default function Men() {
  const [show, setShow] = useState(true)
  const values = getSessionStorageWithExpire('intro')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setSessionStorageWithExpire('intro', true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (values) {
      if (dayjs().diff(dayjs(values.expires)) > 10 * 60 * 1000) {
        sessionStorage.removeItem('intro')
      } else {
        setShow(false)
      }
    }
  }, [values])

  if (!show) return

  return (
    <div className={`absolute inset-0 h-screen w-screen`}>
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        className="h-full w-full"
      />
    </div>
  )
}
