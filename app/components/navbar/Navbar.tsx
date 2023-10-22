import React from 'react'
import Logo from './Logo'
import RightSide from './RightSide'
import { User } from 'next-auth'

interface NavbarProps {
  currentUser?: User | null
}

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <header className="fixed w-full">
      <div className="container flex items-center justify-between">
        <Logo />
        <RightSide currentUser={currentUser} />
      </div>
    </header>
  )
}
