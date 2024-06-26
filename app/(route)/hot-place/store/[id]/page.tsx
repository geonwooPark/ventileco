import getAllStore from '@/actions/_hot-place/getAllStore'
import getStore from '@/actions/_hot-place/getStore'
import StoreCommentInput from '@/components/_hot-place/StoreModal/StoreComment/StoreCommentInput'
import StoreCommentView from '@/components/_hot-place/StoreModal/StoreComment/StoreCommentView'
import StoreModalBody from '@/components/_hot-place/StoreModal/StoreModalBody'
import StoreModalHeader from '@/components/_hot-place/StoreModal/StoreModalHeader'
import NotFound from '@/not-found'
import { Metadata } from 'next'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params
  const listing = await getStore(id)
  if (!listing)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }

  const { store } = listing
  if (!store)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }

  const { store: storeName, description, _id, images } = store

  return {
    title: storeName,
    description,
    openGraph: {
      title: storeName,
      description,
      images: {
        url: images[0].url,
      },
      url: `/store/${_id}`,
      type: 'website',
    },
    alternates: {
      canonical: `/store/${_id}`,
    },
  }
}

export async function generateStaticParams() {
  const listings = await getAllStore()

  return listings.map((listing) => ({
    id: listing._id.toString(),
  }))
}

export default async function page({ params }: IParams) {
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
