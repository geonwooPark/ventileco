import React from 'react'
import ListingItem from './ListingItem'
import { PostingType } from '@/interfaces/interface'

interface ListingProps {
  listing: PostingType[]
}

export default function Listing({ listing }: ListingProps) {
  return (
    <ul>
      {listing?.map((listingItem) => (
        <ListingItem key={listingItem._id} posting={listingItem} />
      ))}
    </ul>
  )
}
