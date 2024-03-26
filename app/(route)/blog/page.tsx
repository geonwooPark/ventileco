import AllListing from '@/components/_blog/_posting/AllListing'
import PopularListing from '@/components/_blog/_posting/PopularListing/PopularListing'
import Article from '@/components/_blog/common/Article/Article'
import HeroSection from '@/components/common/HeroSection'
import Main from '@/components/common/Main'
import Section from '@/components/common/Section'
import { LIMIT, PAGE } from '@/constants'

export const revalidate = 1800

export default async function Home() {
  return (
    <Main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />
      <Section label="인기 게시글">
        <PopularListing />
      </Section>
      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <Article title="전체 게시글">
            <AllListing path="postings" page={PAGE} limit={LIMIT} />
          </Article>
        </div>
      </Section>
    </Main>
  )
}
