import React from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

interface SearchButtonProps {
  isOpen: boolean
  toggleOpen: () => void
}

export default function SearchButton({
  isOpen,
  toggleOpen,
}: SearchButtonProps) {
  return (
    <button
      onClick={toggleOpen}
      className={`flex items-center gap-1 rounded-md bg-gray-700 p-3 text-white shadow-sm duration-200 `}
    >
      <span className="text-sm text-white">
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineSearch size={24} />}
      </span>
    </button>
  )
}
