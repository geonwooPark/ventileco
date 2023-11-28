import React from 'react'
import ListingItem from './ListingItem'
import { GetListingsType } from '@/app/_interfaces/interface'
import getListings from '@/app/_actions/getListings'
import EmptyState from '../../common/EmptyState'
import Pagenation from '../../Pagenation'

type ListingsProps = {
  type: 'all' | 'search' | 'category'
  path: 'postings' | 'search' | 'categories'
  page: number
  limit: number
  search?: string
}

export default async function Listings({
  path,
  type,
  page,
  limit,
  search,
}: ListingsProps) {
  const { postings, postingCount }: GetListingsType = await getListings({
    type,
    search,
    page,
    limit,
  })

  return (
    <>
      {postingCount === 0 ? (
        <EmptyState label="작성된 게시글이 없어요!" />
      ) : (
        <>
          <ul>
            {postings?.map((posting) => {
              return <ListingItem key={posting._id} posting={posting} />
            })}
          </ul>
          <div>
            <Pagenation
              path={path}
              search={search ? search : ''}
              postingCount={postingCount}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  )
}
