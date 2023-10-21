'use client'

import React, { useState } from 'react'
import SearchIcon from './SearchIcon'
import Menu from './Menu'
import Search from './Search'
export default function RightSide() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex items-center gap-4">
      <Search isOpen={isOpen} />
      <SearchIcon isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu />
    </div>
  )
}
