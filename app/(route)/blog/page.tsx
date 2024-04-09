import AllListing from '@/components/_blog/_posting/AllListing'
import PopularListing from '@/components/_blog/_posting/PopularListing/PopularListing'
import CategoryList from '@/components/_blog/common/Category/CategoryList'
import Article from '@/components/common/Article'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import Section from '@/components/common/Section'
import { LIMIT, PAGE } from '@/constants'

export const revalidate = 1800

export default async function Home() {
  return (
    <Main>
      <Section className="pt-10">
        <ProjectTitle title="Popular" />
        <Article>
          <PopularListing />
        </Article>
      </Section>
      <Section>
        <ProjectTitle title="Postings" />
        <Article>
          <CategoryList />
          <AllListing path="postings" page={PAGE} limit={LIMIT} />
        </Article>
      </Section>
    </Main>
  )
}
