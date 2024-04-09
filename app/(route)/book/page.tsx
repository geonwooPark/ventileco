import BookCategoryFilter from '@/components/_book/_main/BookCategoryFilter'
import BookList from '@/components/_book/_main/BookList/BookList'
import SkeletonBookList from '@/components/_book/_main/BookList/SkeletonBookList'
import RecommendedBookList from '@/components/_book/_main/RecommendedBook/RecommendedBookList'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
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
    <Main>
      <Section className="pt-10">
        <ProjectTitle title="Recommended Book" />
        <RecommendedBookList />
      </Section>
      <Section innerKey={Math.random()}>
        <ProjectTitle title="All Book" />
        <BookCategoryFilter category={category} />
        <Suspense fallback={<SkeletonBookList />}>
          <BookList category={category} />
        </Suspense>
      </Section>
    </Main>
  )
}
