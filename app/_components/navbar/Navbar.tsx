'use client'

import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import RightSide from './RightSide'

export default function Navbar() {
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
      className={`fixed w-full z-[100] transition duration-200 ${
        headerColor ? 'bg-black/90' : 'bg-transparent'
      }`}
      ref={scrollRef}
    >
      <div className="flex items-center justify-between py-4 my-container">
        <Logo />
        <RightSide />
      </div>
    </header>
  )
}
