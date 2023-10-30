import React from 'react'

interface DropDownItemProps {
  category: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function DropDownItem({
  category,
  setIsOpen,
  setCategory,
}: DropDownItemProps) {
  return (
    <li
      className="bg-gray-600 px-4 py-2 border-b border-gray-500 cursor-pointer"
      onClick={() => {
        setIsOpen(false)
        setCategory(category)
      }}
    >
      {category}
    </li>
  )
}
