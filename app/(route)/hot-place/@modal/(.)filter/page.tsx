import FilterModalBody from '@/components/_hot-place/FilterModal/FilterModalBody/FilterModalBody'
import FilterModalHeader from '@/components/_hot-place/FilterModal/FilterModalHeader'
import React from 'react'

export default async function FilterModal() {
  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        <FilterModalHeader />
        <FilterModalBody />
      </div>
    </div>
  )
}
