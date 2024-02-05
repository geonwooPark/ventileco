import RecommendedBookList from '@/components/_book/_recommended/RecommendedBookList'
import Main from '@/components/common/Main'
import Section from '@/components/common/Section'
import React from 'react'

export default function page() {
  return (
    <Main>
      <Section label="나의 추천 도서" className="mt-4">
        <RecommendedBookList />
      </Section>
    </Main>
  )
}
