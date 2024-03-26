import Section from '@/components/common/Section'
import Article from '@/components/_blog/common/Article/Article'
import getAllListingCount from '@/actions/_blog/getAllListingCount'
import HeroSection from '@/components/common/HeroSection'
import AllListing from '@/components/_blog/_posting/AllListing'
import { LIMIT } from '@/constants'
import Main from '@/components/common/Main'
import SideBar from '@/components/_blog/common/Sidebar/SideBar'

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
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />
      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <SideBar />
          <Article title="전체 게시글">
            <AllListing path="postings" page={Number(page)} limit={LIMIT} />
          </Article>
        </div>
      </Section>
    </Main>
  )
}
