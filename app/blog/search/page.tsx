import Section from '@/app/components/common/Section'
import Article from '@/app/components/_blog/common/Article/Article'
import getSearchListing from '@/app/actions/getSearchListing'
import HeroSection from '@/app/components/common/HeroSection'

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
          title="검색 결과"
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
