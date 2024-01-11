import { HotPlaceListing } from '@/interfaces/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import StoreRating from '../../StoreModal/StoreDetail/StoreRating'

export default function StoreListItem({
  hotPlaceListing,
}: {
  hotPlaceListing: HotPlaceListing
}) {
  const { _id, store, category, rating, images } = hotPlaceListing
  return (
    <li className="group cursor-pointer p-2 duration-100 last:mb-0 hover:bg-white/80">
      <Link href={`/hot-place/store/${_id}`} className="flex gap-4">
        <div>
          <div className="relative h-[60px] w-[90px] bg-slate-700">
            <Image
              src={images[0]?.url}
              alt="store-thumbnail"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              objectFit="cover"
            />
          </div>
        </div>
        <div>
          <h4 className="mb-0.5 text-sm">{store}</h4>
          <p className="text-xs text-gray-800">{category}</p>
          <StoreRating rating={rating} />
        </div>
      </Link>
    </li>
  )
}
