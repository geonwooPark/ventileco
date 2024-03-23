import getBookReview from '@/actions/_book/getBookReview'
import BookReviewEditForm from '@/components/_book/_edit/BookReviewEditForm'
import Main from '@/components/common/Main'
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
      <Section label="도서 리뷰" className="mt-4">
        <BookReviewEditForm review={review} />
      </Section>
    </Main>
  )
}
