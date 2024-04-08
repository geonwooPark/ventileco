import getStore from '@/actions/_hot-place/getStore'
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
      <div className="modal-shadowed mx-auto h-full w-full rounded-md md:h-[auto] md:w-[500px]">
        <EditModalHeader />
        <EditModalBody listing={listing} />
      </div>
    </div>
  )
}
