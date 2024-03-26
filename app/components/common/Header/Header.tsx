'use client'

import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide/LeftSide'
import Container from '../Container'
import RightSide from './Rightside/RightSide'
import { usePathname } from 'next/navigation'
import { headerColorMap } from '@/constants'

export default function Header() {
  const path = usePathname().split('/')[1]
  const headerColor = headerColorMap.get(path)
  const [showHeaderColor, setShowHeaderColor] = useState(false)
  const scrollRef = useRef<HTMLHeadElement | null>(null)

  const onScroll = () => {
    const { scrollY } = window
    setShowHeaderColor(scrollY > 82 ? true : false)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition duration-200 ${
        showHeaderColor ? 'bg-black/70' : headerColor
      }`}
      ref={scrollRef}
    >
      <Container className="flex items-center justify-between py-4">
        <LeftSide />
        <RightSide path={path} />
      </Container>
    </header>
  )
}
