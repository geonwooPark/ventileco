import React from 'react'
import RecommendedBookSlider from './RecommendedBookSlider'
import MyPick from './MyPick'
import getRecommendedBook from '@/actions/getRecommendedBook'

export default async function RecommendedBook() {
  const recommendedBooks = await getRecommendedBook()
  console.log(recommendedBooks)

  return (
    <>
      <MyPick />
      <RecommendedBookSlider recommendedBooks={recommendedBooks} />
    </>
  )
}
