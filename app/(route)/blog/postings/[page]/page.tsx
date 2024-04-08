import Section from '@/components/common/Section'
import getAllListingCount from '@/actions/_blog/getAllListingCount'
import AllListing from '@/components/_blog/_posting/AllListing'
import { LIMIT } from '@/constants'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import CategoryList from '@/components/_blog/common/Category/CategoryList'
import Article from '@/components/common/Article'

export const revalidate = 1800

interface IParams {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const listingCount = await getAllListingCount()
  const lastPageNum = Math.ceil(listingCount / LIMIT)

  return Array.from({ length: lastPageNum - 1 }).map((_, i) => ({
    page: (i + 2).toString(),
  }))
}

export default async function Postings({ params }: IParams) {
  const { page } = params

  return (
    <Main>
      <Section className="pt-10">
        <ProjectTitle title="Postings" />
        <Article>
          <CategoryList />
          <AllListing path="postings" page={Number(page)} limit={LIMIT} />
        </Article>
      </Section>
    </Main>
  )
}
