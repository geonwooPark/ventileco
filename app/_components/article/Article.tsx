import React, { Suspense } from 'react'
import Listing from './listing/Listing'
import SkeletonListing from './listing/SkeletonListing'

type ArticleProps = (
  | {
      type: 'all'
      path: 'postings'
    }
  | {
      type: 'search'
      path: 'search'
    }
  | {
      type: 'category'
      path: 'categories'
    }
) & {
  title: string
  page: number
  limit: number
  category?: string
  search?: string
}

export default function Article({
  title,
  type,
  path,
  page,
  limit,
  category,
  search,
}: ArticleProps) {
  return (
    <article className="w-full flex flex-col md:w-[calc(100%-120px)]">
      <h3 className="md:text-lg mb-4">{title}</h3>
      <Suspense fallback={<SkeletonListing />}>
        <Listing
          type={type}
          path={path}
          page={page}
          limit={limit}
          category={category}
          search={search}
        />
      </Suspense>
    </article>
  )
}
