import React from 'react'
import ListingItem from './ListingItem'
import { PostingType } from '@/app/interfaces/interface'
import Pagination from '../../Pagination'
import EmptyState from '@/app/components/common/EmptyState'

type ListingProps = {
  path: 'postings' | 'categories' | 'search'
  page: number
  limit: number
  listing: PostingType[]
  listingCount: number
  category?: string
  search?: string
}

export default async function Listing({
  path,
  page,
  limit,
  listing,
  listingCount,
  category,
  search,
}: ListingProps) {
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
      <div>
        <Pagination
          path={path}
          listingCount={listingCount}
          page={page}
          limit={limit}
          category={category}
          search={search}
        />
      </div>
    </>
  )
}
