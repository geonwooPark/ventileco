import React from 'react'
import CategoryFilter from './Filters/CategoryFilter'
import GuFilter from './Filters/GuFilter'

interface FilterProps {
  filteredCategory: string
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>
  filteredGu: string
  setFilteredGu: React.Dispatch<React.SetStateAction<string>>
}

export default function Filter({
  filteredCategory,
  setFilteredCategory,
  filteredGu,
  setFilteredGu,
}: FilterProps) {
  return (
    <div className="flex gap-4">
      <CategoryFilter
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
      />
      <GuFilter filteredGu={filteredGu} setFilteredGu={setFilteredGu} />
    </div>
  )
}
