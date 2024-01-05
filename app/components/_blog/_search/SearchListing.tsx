import getSearchListing from '@/actions/getSearchListing'
import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import EmptyState from '../../common/EmptyState'
import Listing from '../common/Listing/Listing'

interface SearchListingProps {
  path: 'search'
  page: number
  limit: number
  search: string
}

export default async function SearchListing({ ...props }: SearchListingProps) {
  const { page, limit, search } = props
  const { listing, listingCount } = await getSearchListing({
    page,
    limit,
    search,
  })

  if (listingCount === 0) {
    return (
      <div className="h-full">
        <EmptyState label="작성된 게시글이 없어요!" />
      </div>
    )
  }

  return (
    <div>
      <Listing listing={listing} />
      <Pagination {...props} listingCount={listingCount} />
    </div>
  )
}
