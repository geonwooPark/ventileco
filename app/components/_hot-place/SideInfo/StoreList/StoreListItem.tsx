import { HotPlacelistings } from '@/(route)/hot-place/page'
import Link from 'next/link'
import React from 'react'

export default function StoreListItem({
  listing,
}: {
  listing: HotPlacelistings
}) {
  return (
    <li
      key={listing.id}
      className="cursor-pointer p-2 duration-300 last:mb-0 hover:bg-white/40"
    >
      <Link href={`/hot-place/store/${listing.id}`} className="flex gap-4">
        <div>
          <div className="h-[60px] w-[90px] bg-red-400"></div>
        </div>
        <div>
          <h4 className="mb-0.5 text-sm">{listing.store}</h4>
          <p className="text-xs text-gray-700">{listing.category}</p>
          <div className="flex gap-0.5">
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
