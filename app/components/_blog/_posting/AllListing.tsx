import getAllListing from '@/app/actions/getAllListing'
import getAllListingCount from '@/app/actions/getAllListingCount'
import React from 'react'
import EmptyState from '../../common/EmptyState'
import Pagination from '../common/Pagination/Pagination'
import ListingItem from '../common/Listing/ListingItem'
import Listing from '../common/Listing/Listing'

interface AllListingProps {
  path: 'postings'
  page: number
  limit: number
}

export default async function AllListing({ ...props }: AllListingProps) {
  const { page, limit } = props
  const listing = await getAllListing({
    page,
    limit,
  })
  const listingCount = await getAllListingCount()

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
