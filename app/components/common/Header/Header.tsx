'use client'

import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide/LeftSide'
import Container from '../Container'
import RightSide from './Rightside/RightSide'

export default function Header() {
  const [headerColor, setHeaderColor] = useState(false)
  const scrollRef = useRef<HTMLHeadElement | null>(null)

  const onScroll = () => {
    const { scrollY } = window
    if (scrollY > 82) setHeaderColor(true)
    else setHeaderColor(false)
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
        headerColor ? 'bg-black/90' : 'bg-transparent'
      }`}
      ref={scrollRef}
    >
      <Container className="flex items-center justify-between py-4">
        <LeftSide />
        <RightSide />
      </Container>
    </header>
  )
}
