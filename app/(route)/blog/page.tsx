import AllListing from '@/app/components/_blog/_posting/AllListing'
import PopularListing from '@/app/components/_blog/_posting/PopularListing/PopularListing'
import Article from '@/app/components/_blog/common/Article/Article'
import SideBar from '@/app/components/_blog/common/Sidebar/SideBar'
import HeroSection from '@/app/components/common/HeroSection'
import Main from '@/app/components/common/Main'
import Section from '@/app/components/common/Section'
import { LIMIT, PAGE } from '@/app/constants'

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
          <SideBar />
          <Article title="전체 게시글">
            <AllListing path="postings" page={PAGE} limit={LIMIT} />
          </Article>
        </div>
      </Section>
    </Main>
  )
}
