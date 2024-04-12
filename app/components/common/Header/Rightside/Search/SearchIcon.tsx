import React, { useState } from 'react'
import SearchWindow from './SearchWindow'
import { IconClose, IconSearch } from '../../../../../../public/svgs/icons'

export default function SearchIcon() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div onClick={toggleOpen}>
      <SearchWindow isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative z-[100] size-5 cursor-pointer">
        {isOpen ? <IconClose /> : <IconSearch />}
      </div>
    </div>
  )
}
