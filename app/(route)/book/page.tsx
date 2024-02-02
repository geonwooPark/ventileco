import AddReviewButton from '@/components/_book/AddReviewButton'
import BookCategoryFilter from '@/components/_book/BookCategoryFilter'
import BookList from '@/components/_book/BookList'
import RecommendedBook from '@/components/_book/RecommendedBook'
import SkeletonBookList from '@/components/_book/SkeletonBookList'
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
      <RecommendedBook />
      <Section label="그동안 읽은 도서 리스트" innerKey={Math.random()}>
        <BookCategoryFilter category={category} />
        <Suspense fallback={<SkeletonBookList />}>
          <BookList category={category} />
        </Suspense>
      </Section>
      <AddReviewButton />
    </Main>
  )
}
