'use client'

import React from 'react'
import Container from '../Container'
import RightSide from './Rightside/RightSide'
import { usePathname } from 'next/navigation'
import HeaderList from './HeaderList/HeaderList'

export default function Header() {
  const path = usePathname().split('/')[1]

  return (
    <header
      className={`fixed top-0 z-[100] h-[64px] w-full bg-beige-light font-point transition duration-200`}
    >
      <Container className="flex h-full items-center justify-between">
        <HeaderList />
        <RightSide path={path} />
      </Container>
    </header>
  )
}
