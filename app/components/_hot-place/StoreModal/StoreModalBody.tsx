import React from 'react'
import StoreImageSlider from './StoreDetail/StoreImageSlider'
import StoreRating from './StoreDetail/StoreRating'
import StoreHashtags from './StoreDetail/StoreHashtags'
import { HotPlaceListingType, UserType } from '@/interfaces/interface'
import StoreModalCloseButton from './StoreModalCloseButton'

interface StoreModalBodyProps {
  listing: {
    store: HotPlaceListingType | null
    user: UserType | null
  }
}

export default function StoreModalBody({ listing }: StoreModalBodyProps) {
  const { store, user } = listing
  if (!store || !user) return
  const {
    store: storeName,
    category,
    description,
    rating,
    address,
    hashtags,
    images,
  } = store
  const { name } = user

  return (
    <>
      <div className="overflow-hidden px-4">
        <StoreImageSlider images={images} />
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-lg font-medium">{storeName}</h4>
          <p className="text-sm text-gray-400">{category}</p>
          <StoreRating rating={rating} />
        </div>
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
          <p>{address}</p>
          <div className="flex items-center gap-2">
            <p>✏️{name}</p>
          </div>
        </div>
        <textarea
          value={description}
          readOnly
          className="mb-1 h-[100px] w-full cursor-default resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none"
        />
        <StoreHashtags hashtags={hashtags} />
      </div>
      <StoreModalCloseButton />
    </>
  )
}
