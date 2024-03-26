import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import SearchWindow from './SearchWindow'

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
      <div className="relative z-[100] cursor-pointer text-white">
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineSearch size={24} />}
      </div>
    </div>
  )
}
