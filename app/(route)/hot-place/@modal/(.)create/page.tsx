import React from 'react'
import CreateModalBody from '@/components/_hot-place/CreateModal/CreateModalBody'
import CreateModalHeader from '@/components/_hot-place/CreateModal/CreateModalHeader'

export default function CreateModal() {
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        <CreateModalHeader />
        <CreateModalBody />
      </div>
    </div>
  )
}
