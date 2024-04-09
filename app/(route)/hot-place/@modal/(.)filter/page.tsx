import FilterModalBody from '@/components/_hot-place/FilterModal/FilterModalBody/FilterModalBody'
import FilterModalHeader from '@/components/_hot-place/FilterModal/FilterModalHeader'
import React from 'react'

export default async function FilterModal() {
  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/50">
      <div className="modal-shadowed mx-auto h-full w-full rounded-md md:h-[auto] md:w-[500px]">
        <FilterModalHeader />
        <FilterModalBody />
      </div>
    </div>
  )
}
