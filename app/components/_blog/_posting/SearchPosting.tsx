'use client'

import SearchWindow from '@/components/common/Header/Rightside/Search/SearchWindow'
import React, { useState } from 'react'
import SearchButton from './SearchButton'

export default function SearchPosting() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="absolute left-0 top-0 z-[200] size-full">
      <SearchButton isOpen={isOpen} toggleOpen={toggleOpen} />
      <SearchWindow isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
