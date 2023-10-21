import React from 'react'
import Logo from './Logo'
import RightSide from './RightSide'

export default function Navbar() {
  return (
    <header className="fixed w-full">
      <div className="container flex items-center justify-between">
        <Logo />
        <RightSide />
      </div>
    </header>
  )
}
