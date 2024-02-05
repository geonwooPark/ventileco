import BookReviewForm from '@/components/_book/_write/BookReviewForm'
import Main from '@/components/common/Main'
import Section from '@/components/common/Section'
import React from 'react'

export default function page() {
  return (
    <Main>
      <Section label="도서 리뷰" className="mt-4">
        <BookReviewForm />
      </Section>
    </Main>
  )
}
