import PopularListings from './_components/popularListings/PopularListings'
import Section from './_components/common/Section'
import HeroSection from './_components/hero/HeroSection'
import Aside from './_components/aside/Aside'
import Article from './_components/article/Article'

export const revalidate = 600

export default async function Home() {
  const page = 1
  const limit = 10

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section label="인기 게시글">
        <PopularListings />
      </Section>

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <Aside />
          <Article title="전체 게시글" page={page} limit={limit} />
        </div>
      </Section>
    </main>
  )
}
