import React, { Suspense } from 'react'
import Listings from './listings/Listings'
import SkeletonListings from './listings/SkeletonListings'

interface ArticleProps {
  title: string
  page: number
  limit: number
  search?: string
}

export default function Article({ title, page, limit, search }: ArticleProps) {
  return (
    <article className="w-full flex flex-col md:w-[calc(100%-120px)]">
      <h3 className="md:text-lg mb-4">{title}</h3>
      <Suspense fallback={<SkeletonListings />}>
        <Listings
          path="postings"
          type="all"
          page={page}
          limit={limit}
          search={search}
        />
      </Suspense>
    </article>
  )
}
