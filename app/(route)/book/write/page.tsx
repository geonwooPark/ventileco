import BookReviewForm from '@/components/_book/_write/BookReviewForm'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import Section from '@/components/common/Section'
import React from 'react'

export default function page() {
  return (
    <Main>
      <Section className="mt-4">
        <ProjectTitle title="Write" />
        <BookReviewForm />
      </Section>
    </Main>
  )
}
