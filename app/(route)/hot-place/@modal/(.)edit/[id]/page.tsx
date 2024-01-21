import getStore from '@/actions/getStore'
import EditModalBody from '@/components/_hot-place/EditModal/EditModalBody'
import EditModalHeader from '@/components/_hot-place/EditModal/EditModalHeader'
import NotFound from '@/not-found'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export default async function EditModal({ params }: IParams) {
  const { id } = params
  const listing = await getStore(id)

  if (!listing) return NotFound()

  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        <EditModalHeader />
        <EditModalBody listing={listing} />
      </div>
    </div>
  )
}
