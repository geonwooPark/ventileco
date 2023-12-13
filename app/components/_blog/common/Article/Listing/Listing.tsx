import React from 'react'
import { PostingType } from '@/app/interfaces/interface'
import Pagination from '../../Pagination/Pagination'
import EmptyState from '@/app/components/common/EmptyState'
import ListingItem from './ListingItem'

type ListingProps = {
  path: 'postings' | 'categories' | 'search'
  page: number
  limit: number
  listing: PostingType[]
  listingCount: number
  category?: string
  search?: string
}

export default async function Listing({ listing, ...props }: ListingProps) {
  const { listingCount } = props
  if (listingCount === 0) {
    return (
      <div className="h-full">
        <EmptyState label="작성된 게시글이 없어요!" />
      </div>
    )
  }

  return (
    <>
      <ul>
        {listing?.map((listingItem) => {
          return <ListingItem key={listingItem._id} posting={listingItem} />
        })}
      </ul>
      <Pagination {...props} />
    </>
  )
}
