import React, { Suspense } from 'react'
import Listing from './listing/Listing'
import SkeletonListing from './listing/SkeletonListing'
import { PostingType } from '@/app/_interfaces/interface'

type ArticleProps = {
  path: 'postings' | 'categories' | 'search'
  title: string
  page: number
  limit: number
  listing: PostingType[]
  listingCount: number
  category?: string
  search?: string
}

export default function Article({
  title,
  path,
  page,
  limit,
  listing,
  listingCount,
  category,
  search,
}: ArticleProps) {
  return (
    <article className="w-full flex flex-col md:w-[calc(100%-120px)]">
      <h3 className="md:text-lg mb-4">{title}</h3>
      <Suspense fallback={<SkeletonListing />}>
        <Listing
          path={path}
          page={page}
          limit={limit}
          listing={listing}
          listingCount={listingCount}
          category={category}
          search={search}
        />
      </Suspense>
    </article>
  )
}
