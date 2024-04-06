import { StoreCategory } from '@/constants'
import React from 'react'

interface CategoryFilterProps {
  filteredCategory: string
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryFilter({
  filteredCategory,
  setFilteredCategory,
}: CategoryFilterProps) {
  const onClick = (selectedCategory: string) => {
    filteredCategory.includes(selectedCategory)
      ? setFilteredCategory((prev) =>
          filteredCategory === selectedCategory
            ? ''
            : prev.startsWith(selectedCategory)
              ? prev.replace(`${selectedCategory},`, '')
              : prev.replace(`,${selectedCategory}`, ''),
        )
      : setFilteredCategory((prev) =>
          prev ? `${prev},${selectedCategory}` : selectedCategory,
        )
  }

  return (
    <ul
      className={`flex-1 rounded-md border bg-gray-100 text-center ${
        filteredCategory ? 'border-blue-600' : 'border-transparent'
      }`}
    >
      {StoreCategory.map((item) => (
        <li
          key={item.id}
          className={`cursor-pointer py-1 text-sm ${
            filteredCategory.includes(item.category)
              ? 'text-blue-600'
              : 'text-gray-400'
          }`}
          onClick={() => onClick(item.category)}
        >
          {item.category}
        </li>
      ))}
    </ul>
  )
}
