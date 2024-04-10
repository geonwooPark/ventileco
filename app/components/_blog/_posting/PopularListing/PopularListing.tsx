import React from 'react'
import PopularListingItem from './PopularListingItem'
import Slider from '@/components/common/Slider'
import getPopularListing from '@/actions/_blog/getPopularListing'

export default async function PopularListing() {
  const postings = await getPopularListing()

  return (
    <Slider gap={24}>
      {postings.map((posting) => (
        <PopularListingItem key={posting._id} posting={posting} />
      ))}
    </Slider>
  )
}
