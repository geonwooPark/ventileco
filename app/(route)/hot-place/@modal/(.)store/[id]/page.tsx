import getStore from '@/actions/_hot-place/getStore'
import StoreModalBody from '@/components/_hot-place/StoreModal/StoreModalBody'
import StoreModalHeader from '@/components/_hot-place/StoreModal/StoreModalHeader'
import NotFound from '@/not-found'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export default async function StoreModal({ params }: IParams) {
  const { id } = params
  const listing = await getStore(id)

  if (!listing) return NotFound()

  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center bg-black/50">
      <div className="modal-shadowed mx-auto h-full w-full rounded-md md:h-[auto] md:w-[500px]">
        <StoreModalHeader />
        <StoreModalBody listing={listing} />
      </div>
    </div>
  )
}
