import Section from './_components/common/Section'
import HeroSection from './_components/heroSection/HeroSection'
import Article from './_components/article/Article'
import PopularListing from './_components/popularListing/PopularListing'
import CategoryMenu from './_components/category/CategoryMenu'

export const revalidate = 1800

const PAGE = 1
const LIMIT = 5

export default async function Home() {
  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section label="인기 게시글">
        <PopularListing />
      </Section>

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <CategoryMenu />
          <Article
            title="전체 게시글"
            type="all"
            path="postings"
            page={PAGE}
            limit={LIMIT}
          />
        </div>
      </Section>
    </main>
  )
}
