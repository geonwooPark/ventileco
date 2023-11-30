import React from 'react'
import ListingItem from './ListingItem'
import { PostingType } from '@/app/_interfaces/interface'
import EmptyState from '../../common/EmptyState'
import Pagination from '../../Pagination'

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
    return <EmptyState label="작성된 게시글이 없어요!" />
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
