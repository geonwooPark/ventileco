import Section from '@common/Section'
import { Suspense } from 'react'
import SearchListing from '@blog/_search/SearchListing'
import SkeletonListing from '@blog/common/Listing/SkeletonListing'
import Main from '@common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import Article from '@/components/common/Article'

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
      <Section innerKey={Math.random()} className="pt-10">
        <ProjectTitle title="Search Results" />
        <Article>
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
