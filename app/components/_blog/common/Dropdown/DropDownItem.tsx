import { PostingType } from '@/interfaces/interface'
import React from 'react'

interface DropDownItemProps {
  category: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setPosting: React.Dispatch<
    React.SetStateAction<
      Omit<PostingType, '_id' | 'createdAt' | 'updatedAt' | 'views'>
    >
  >
}

export default function DropDownItem({
  category,
  setIsOpen,
  setPosting,
}: DropDownItemProps) {
  const onClick = () => {
    setIsOpen(false)
    setPosting((prev) => {
      return { ...prev, category }
    })
  }

  return (
    <li
      className="cursor-pointer border-b border-gray-500 bg-gray-600 px-4 py-2 text-xs"
      onClick={onClick}
    >
      {category}
    </li>
  )
}
