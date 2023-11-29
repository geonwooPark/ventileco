import React from 'react'
import ListingItem from './ListingItem'
import { GetListingType } from '@/app/_interfaces/interface'
import getListings from '@/app/_actions/getListing'
import EmptyState from '../../common/EmptyState'
import Pagination from '../../Pagination'

type ListingProps = {
  type: 'all' | 'category' | 'search'
  path: 'postings' | 'categories' | 'search'
  page: number
  limit: number
  category?: string
  search?: string
}

export default async function Listing({
  path,
  type,
  page,
  limit,
  category,
  search,
}: ListingProps) {
  const { listing, listingCount }: GetListingType = await getListings({
    type,
    page,
    limit,
    category,
    search,
  })

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
