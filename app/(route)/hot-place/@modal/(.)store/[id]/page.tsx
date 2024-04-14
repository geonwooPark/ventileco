import getStore from '@/actions/_hot-place/getStore'
import StoreCommentInput from '@/components/_hot-place/StoreModal/StoreComment/StoreCommentInput'
import StoreCommentView from '@/components/_hot-place/StoreModal/StoreComment/StoreCommentView'
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
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/50">
      <div className="flex h-full w-full items-start  justify-center gap-4 md:h-[auto]">
        <div className="modal-shadowed h-full w-full rounded-md md:w-[500px]">
          <StoreModalHeader />
          <StoreModalBody listing={listing} />
        </div>
        <div className="hidden h-[360px] w-[240px] overflow-hidden rounded-md bg-white md:block">
          <StoreCommentView />
          <StoreCommentInput />
        </div>
      </div>
    </div>
  )
}
