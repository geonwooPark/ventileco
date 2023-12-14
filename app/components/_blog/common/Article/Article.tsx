import React from 'react'
import Listing from './Listing/Listing'
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

export default function Article({ title, ...props }: ArticleProps) {
  return (
    <article className="flex w-full flex-col md:w-[calc(100%-120px)]">
      <h2 className="mb-4 md:text-lg">{title}</h2>
      <Listing {...props} />
    </article>
  )
}
