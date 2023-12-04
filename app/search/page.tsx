import { Metadata } from 'next'
import HeroSection from '../_components/heroSection/HeroSection'
import Section from '../_components/common/Section'
import Article from '../_components/article/Article'
import getSearchListing from '../_actions/getSearchListing'

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과 페이지입니다.',
  robots: {
    index: false,
    nocache: true,
  },
}

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 5
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : ''

  const { listing, listingCount } = await getSearchListing({
    page,
    limit,
    search,
  })

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <Article
          title="검색결과"
          path="search"
          page={page}
          limit={limit}
          listing={listing}
          listingCount={listingCount}
          search={search}
        />
      </Section>
    </main>
  )
}
