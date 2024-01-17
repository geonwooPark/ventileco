import React from 'react'
import DeleteModalHeader from '@/components/_hot-place/DeleteModal/DeleteModalHeader'
import DeleteModalBody from '@/components/_hot-place/DeleteModal/DeleteModalBody'

interface IParams {
  params: {
    id: string
  }
}

export default function page({ params }: IParams) {
  const { id } = params

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[360px]">
        <DeleteModalHeader />
        <DeleteModalBody storeId={id} />
      </div>
    </div>
  )
}
