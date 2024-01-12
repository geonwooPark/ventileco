import { HotPlaceListing } from '@/interfaces/interface'
import React from 'react'
import StoreImageSlider from './StoreDetail/StoreImageSlider'
import StoreModalButton from './StoreDetail/StoreModalButton'
import StoreRating from './StoreDetail/StoreRating'
import StoreHashtags from './StoreDetail/StoreHashtags'

interface StoreModalBodyProps {
  listing: HotPlaceListing
}

export default function StoreModalBody({ listing }: StoreModalBodyProps) {
  const {
    store,
    category,
    description,
    rating,
    address,
    hashtags,
    images,
    _id,
  } = listing
  return (
    <>
      <div className="overflow-hidden px-4">
        <StoreImageSlider images={images} />
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-lg font-medium">{store}</h4>
          <p className="text-sm text-gray-400">{category}</p>
          <StoreRating rating={rating} />
        </div>
        <p className="mb-2 text-sm text-gray-700">{address}</p>
        <textarea
          value={description}
          readOnly
          className="mb-1 h-[100px] w-full cursor-default resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none"
        />
        <StoreHashtags hashtags={hashtags} />
      </div>
      <StoreModalButton storeId={_id} />
    </>
  )
}
