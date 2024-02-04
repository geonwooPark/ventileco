import React from 'react'
import RecommendedBookSlider from './RecommendedBookSlider'
import RecommendedBookHeader from './RecommendedBookHeader'
import getRecommendedBook from '@/actions/getRecommendedBook'

export default async function RecommendedBook() {
  const recommendedBooks = await getRecommendedBook()

  return (
    <section className="relative mb-20 flex h-[calc(320px-82px)] w-full items-center overflow-hidden bg-gray-100 md:h-[calc(420px-102px)] ">
      <RecommendedBookHeader />
      <RecommendedBookSlider recommendedBooks={recommendedBooks} />
    </section>
  )
}
