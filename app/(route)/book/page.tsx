import BookCategoryFilter from '@/components/_book/_main/BookCategoryFilter'
import BookList from '@/components/_book/_main/BookList/BookList'
import SkeletonBookList from '@/components/_book/_main/BookList/SkeletonBookList'
import RecommendedBook from '@/components/_book/_main/RecommendedBook/RecommendedBook'
import Container from '@/components/common/Container'
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
      <Container className="pt-10">
        <ProjectTitle title="Recommended Book" />
      </Container>
      <RecommendedBook />
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
