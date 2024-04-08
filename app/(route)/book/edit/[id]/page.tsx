import getBookReview from '@/actions/_book/getBookReview'
import BookReviewEditForm from '@/components/_book/_edit/BookReviewEditForm'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import Section from '@/components/common/Section'
import NotFound from '@/not-found'
import React from 'react'

interface IParams {
  params: {
    id: string
  }
}

export default async function page({ params }: IParams) {
  const { id } = params
  const review = await getBookReview(id)
  if (!review) return NotFound()

  return (
    <Main>
      <Section className="mt-4">
        <ProjectTitle title="Update" />
        <BookReviewEditForm review={review} />
      </Section>
    </Main>
  )
}
