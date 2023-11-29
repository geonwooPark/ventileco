import React from 'react'
import ListingItem from './ListingItem'
import { GetListingsType } from '@/app/_interfaces/interface'
import getListings from '@/app/_actions/getListings'
import EmptyState from '../../common/EmptyState'
import Pagination from '../../Pagination'

type ListingsProps = {
  type: 'all' | 'category' | 'search'
  path: 'postings' | 'categories' | 'search'
  page: number
  limit: number
  category?: string
  search?: string
}

export default async function Listings({
  path,
  type,
  page,
  limit,
  category,
  search,
}: ListingsProps) {
  const { postings, postingCount }: GetListingsType = await getListings({
    type,
    page,
    limit,
    category,
    search,
  })

  if (postingCount === 0) {
    return <EmptyState label="작성된 게시글이 없어요!" />
  }

  return (
    <>
      <ul>
        {postings?.map((posting) => {
          return <ListingItem key={posting._id} posting={posting} />
        })}
      </ul>
      <div>
        <Pagination
          path={path}
          postingCount={postingCount}
          page={page}
          limit={limit}
          category={category}
          search={search}
        />
      </div>
    </>
  )
}
