import RecommendedBookList from '@/components/_book/_recommended/RecommendedBookList'
import Main from '@/components/common/Main'
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
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
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
      <Section label="나의 추천 도서" className="mt-4">
        <RecommendedBookList />
      </Section>
    </Main>
  )
}
