import Section from '@common/Section'
import HeroSection from '@common/HeroSection'
import { Suspense } from 'react'
import SearchListing from '@blog/_search/SearchListing'
import Article from '@blog/common/Article/Article'
import SkeletonListing from '@blog/common/Listing/SkeletonListing'
import Main from '@common/Main'

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

  return (
    <Main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section innerKey={Math.random()}>
        <Article title="검색 결과">
          <Suspense fallback={<SkeletonListing />}>
            <SearchListing
              path="search"
              page={page}
              limit={limit}
              search={search}
            />
          </Suspense>
        </Article>
      </Section>
    </Main>
  )
}
