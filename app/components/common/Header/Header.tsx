import React from 'react'
import Container from '../Container'
import RightSide from './Rightside/RightSide'
import LeftSide from './Leftside/LeftSide'
import Logo from './Logo'

export default function Header() {
  return (
    <header
      className={`fixed top-0 z-[100] h-[56px] w-full bg-red-400 font-normal shadow-md transition duration-200`}
    >
      <Container className="flex h-full items-center justify-between">
        <LeftSide />
        <Logo />
        <RightSide />
      </Container>
    </header>
  )
}
