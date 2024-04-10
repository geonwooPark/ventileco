import React from 'react'
import getRecommendedBook from '@/actions/_book/getRecommendedBook'
import Slider from '@/components/common/Slider'
import RecommendedBookItem from './RecommendedBookItem'

export default async function RecommendedBookList() {
  const recommendedBooks = await getRecommendedBook()

  return (
    <Slider gap={24}>
      {recommendedBooks.map((recommendedBook) => (
        <RecommendedBookItem
          key={recommendedBook._id}
          recommendedBook={recommendedBook}
        />
      ))}
    </Slider>
  )
}
