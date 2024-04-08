import React from 'react'
import WriteModalBody from '@/components/_hot-place/WriteModal/WriteModalBody'
import WriteModalHeader from '@/components/_hot-place/WriteModal/WriteModalHeader'

export default function WriteModal() {
  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="modal-shadowed mx-auto h-full w-full rounded-md md:h-[auto] md:w-[500px]">
        <WriteModalHeader />
        <WriteModalBody />
      </div>
    </div>
  )
}
