import getPopularListing from '@/actions/_blog/getPopularListing'
import React from 'react'
import PopularListingItem from './PopularListingItem'

export default async function PopularListing() {
  const postings = await getPopularListing()
  return (
    <div className="hide-scroll overflow-y-hidden overflow-x-scroll md:overflow-x-visible">
      <ul className="flex gap-6">
        {postings.map((posting) => {
          return <PopularListingItem key={posting._id} posting={posting} />
        })}
      </ul>
    </div>
  )
}
