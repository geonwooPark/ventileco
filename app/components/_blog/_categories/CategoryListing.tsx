import getCategoryListing from '@/actions/getCategoryListing'
import getCategoryListingCount from '@/actions/getCategoryListingCount'
import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import EmptyState from '../../common/EmptyState'
import Listing from '../common/Listing/Listing'

interface CategoryListingProps {
  path: 'categories'
  page: number
  limit: number
  category: string
}

export default async function CategoryListing({
  ...props
}: CategoryListingProps) {
  const { page, limit, category } = props

  const listing = await getCategoryListing({
    page,
    limit,
    category,
  })
  const listingCount = await getCategoryListingCount(category)

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
