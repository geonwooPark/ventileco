'use client'

import React, { useState } from 'react'
import SearchIcon from './SearchIcon'
import Menu from './Menu'
import Search from './Search'
import { User } from 'next-auth'

interface RightSideProps {
  currentUser?: User | null
}
export default function RightSide({ currentUser }: RightSideProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex items-center gap-4">
      <Search isOpen={isOpen} />
      <SearchIcon isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu currentUser={currentUser} />
    </div>
  )
}
