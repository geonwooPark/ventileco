import RecommendedBookList from '@/components/_book/_recommended/RecommendedBookList'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import Section from '@/components/common/Section'
import React from 'react'

export const revalidate = 1800

export async function generateMetadata() {
  return {
    title: '나의 추천 도서',
    description: `굉장히 재밌게 읽었거나 살면서 도움이 되는 책들을 추천합니다!`,
    openGraph: {
      title: '나의 추천 도서',
      description: `굉장히 재밌게 읽었거나 살면서 도움이 되는 책들을 추천합니다!`,
      images: '/images/og-image.png',
      url: `/recommended`,
      type: 'website',
    },
    alternates: {
      canonical: `/recommended`,
    },
  }
}

export default function page() {
  return (
    <Main>
      <Section className="pt-10">
        <ProjectTitle title="Recommended Book" />
        <RecommendedBookList />
      </Section>
    </Main>
  )
}
