import React from 'react'
import Pagenation from '../Pagenation'
import EmptyState from '../EmptyState'
import ListingItem from '../ListingItem'
import { PostingType } from '@/app/interfaces/interface'
import getData from '@/app/actions/getData'

interface ListingsProps {
  path: string
  url: string
  page: number
  limit: number
  search?: string
}

export default async function Listings({
  path,
  url,
  page,
  limit,
  search,
}: ListingsProps) {
  // 전체 경로를 적지 않으면 URL을 parse하지 못하는 에러 발생
  const {
    postings,
    postingCount,
  }: { postings: PostingType[]; postingCount: number } = await getData(url)
  return (
    <>
      {postingCount === 0 ? (
        <EmptyState label="작성된 게시글이 없어요!" />
      ) : (
        <main>
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
        </main>
      )}
    </>
  )
}
