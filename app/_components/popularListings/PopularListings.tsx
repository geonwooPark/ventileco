import getPopularListings from '@/app/_actions/getPopularListings'
import React from 'react'
import PopularListingItem from './PopularListingItem'

export default async function PopularListings() {
  const postings = await getPopularListings()
  return (
    <div className="overflow-x-scroll md:overflow-x-visible overflow-y-hidden hide-scroll">
      <ul className="flex gap-6">
        {postings.map((posting) => {
          return <PopularListingItem key={posting._id} posting={posting} />
        })}
      </ul>
    </div>
  )
}
