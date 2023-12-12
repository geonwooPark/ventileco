import React from 'react'
import Listing from './listing/Listing'
import { PostingType } from '@/app/interfaces/interface'

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
      <h2 className="mb-4 md:text-lg">{title}</h2>
      <Listing
        path={path}
        page={page}
        limit={limit}
        listing={listing}
        listingCount={listingCount}
        category={category}
        search={search}
      />
    </article>
  )
}
