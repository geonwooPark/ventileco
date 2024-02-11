import DeleteModalBody from '@/components/_book/DeleteModal/DeleteModalBody'
import DeleteModalHeader from '@/components/_book/DeleteModal/DeleteModalHeader'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export default function DeleteModal({ params }: IParams) {
  const { id } = params

  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[360px]">
        <DeleteModalHeader />
        <DeleteModalBody bookId={id} />
      </div>
    </div>
  )
}
