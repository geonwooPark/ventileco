import React from 'react'
import Container from '../Container'
import RightSide from './Rightside/RightSide'
import HomeButton from './HomeButton'
import LeftSide from './Leftside/LeftSide'
import HeaderDecoration from './HeaderDecoration'

export default function Header() {
  return (
    <header
      className={`fixed top-0 z-[100] h-[56px] w-full bg-beige-light font-normal shadow-md transition duration-200`}
    >
      <Container className="flex h-full items-center justify-between">
        <LeftSide />
        <HomeButton />
        <RightSide />
      </Container>

      {/* <HeaderDecoration /> */}
    </header>
  )
}
