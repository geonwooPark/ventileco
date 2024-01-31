import AddReviewButton from '@/components/_book/AddReviewButton'
import BookCategoryFilter from '@/components/_book/BookCategoryFilter'
import BookList from '@/components/_book/BookList'
import RecommendedBook from '@/components/_book/RecommendedBook'
import Main from '@/components/common/Main'
import Section from '@/components/common/Section'
import React, { Suspense } from 'react'

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : '전체'

  return (
    <Main className="bg-white">
      <section className="relative mb-20 h-[320px] w-full overflow-hidden bg-gray-100 md:h-[420px]">
        <RecommendedBook />
      </section>
      <Section label="그동안 읽은 책 리스트">
        <BookCategoryFilter category={category} />
        <Suspense fallback={<div>로딩중...</div>}>
          <BookList />
        </Suspense>
      </Section>
      <div className="fixed left-4 top-[96px] z-[50] flex gap-2 md:top-[118px]">
        <AddReviewButton />
      </div>
    </Main>
  )
}
