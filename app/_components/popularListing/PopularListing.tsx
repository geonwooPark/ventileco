import getPopularListing from '@/app/_actions/getPopularListing'
import React from 'react'
import PopularListingItem from './PopularListingItem'

export default async function PopularListing() {
  const postings = await getPopularListing()
  return (
    <div className="overflow-x-scroll overflow-y-hidden md:overflow-x-visible hide-scroll">
      <ul className="flex gap-6">
        {postings.map((posting) => {
          return <PopularListingItem key={posting._id} posting={posting} />
        })}
      </ul>
    </div>
  )
}
