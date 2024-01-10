import getStore from '@/actions/getStore'
import StoreModalBody from '@/components/_hot-place/StoreModal/StoreModalBody'
import StoreModalHeader from '@/components/_hot-place/StoreModal/StoreModalHeader'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return [{ id: '659d796b9b2ea257e0857ad7'.toString() }]
}

export default async function StoreModal({ params }: IParams) {
  const store = await getStore(params.id)
  console.log(store)
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        <StoreModalHeader />
        <StoreModalBody />
      </div>
    </div>
  )
}
