import { HotPlacelistings } from '@/(route)/hot-place/page'
import React from 'react'
import StoreListItem from './StoreListItem'

export default function StoreList({
  listings,
}: {
  listings: HotPlacelistings[]
}) {
  return (
    <ul>
      {listings.map((listing) => (
        <StoreListItem key={listing.id} listing={listing} />
      ))}
    </ul>
  )
}
