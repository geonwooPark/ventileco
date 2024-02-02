import React from 'react'
import RecommendedBookSlider from './RecommendedBookSlider'
import RecommendedBookHeader from './RecommendedBookHeader'
import getRecommendedBook from '@/actions/getRecommendedBook'

export default async function RecommendedBook() {
  const recommendedBooks = await getRecommendedBook()

  return (
    <section className="relative mb-20 h-[320px] w-full overflow-hidden bg-gray-100 md:h-[420px]">
      <RecommendedBookHeader />
      <RecommendedBookSlider recommendedBooks={recommendedBooks} />
    </section>
  )
}
