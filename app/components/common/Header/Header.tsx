'use client'

import React from 'react'
import Container from '../Container'
import RightSide from './Rightside/RightSide'
import { usePathname } from 'next/navigation'
import HomeButton from './HomeButton'
import LeftSide from './Leftside/LeftSide'

export default function Header() {
  const path = usePathname()

  return (
    <header
      className={`fixed top-0 z-[100] h-[64px] w-full bg-beige-light font-normal shadow-md transition duration-200`}
    >
      <Container className="flex h-full items-center justify-between">
        <LeftSide path={path} />
        <HomeButton />
        <RightSide path={path} />
      </Container>
    </header>
  )
}
