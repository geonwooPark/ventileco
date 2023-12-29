import React from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

interface SearchIconProps {
  isOpen: boolean
  toggleOpen: () => void
}

export default function SearchIcon({ isOpen, toggleOpen }: SearchIconProps) {
  return (
    <div onClick={toggleOpen} className="z-50 cursor-pointer text-white">
      {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineSearch size={24} />}
    </div>
  )
}
