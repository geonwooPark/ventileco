import getCategoryListing from '@/app/actions/getCategoryListing'
import getCategoryListingCount from '@/app/actions/getCategoryListingCount'
import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import ListingItem from '../common/Listing/ListingItem'
import EmptyState from '../../common/EmptyState'

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
      <ul>
        {listing?.map((listingItem) => {
          return <ListingItem key={listingItem._id} posting={listingItem} />
        })}
      </ul>
      <Pagination {...props} listingCount={listingCount} />
    </div>
  )
}
