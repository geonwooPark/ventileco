'use client'

import React, { useState } from 'react'
import FilterModalActionButton from './FilterModalActionButton'
import Filter from './Filter'
import { useHotPlaceFilter } from '@/hooks/store/useHotPlaceFilterStore'

export default function FilterModalBody() {
  const { category, gu } = useHotPlaceFilter()
  const [filteredCategory, setFilteredCategory] = useState(category)
  const [filteredGu, setFilteredGu] = useState(gu)

  return (
    <div className="px-4">
      <Filter
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
        filteredGu={filteredGu}
        setFilteredGu={setFilteredGu}
      />
      <FilterModalActionButton
        filteredCategory={filteredCategory}
        filteredGu={filteredGu}
      />
    </div>
  )
}
