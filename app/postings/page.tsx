import HeroSection from '../_components/hero/HeroSection'
import Section from '../_components/common/Section'
import Aside from '../_components/aside/Aside'
import Article from '../_components/article/Article'

export default async function Postings({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams?.limit === 'string' ? Number(searchParams.limit) : 10

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <Aside />
          <Article
            title="전체 게시글"
            type="all"
            path="postings"
            page={page}
            limit={limit}
          />
        </div>
      </Section>
    </main>
  )
}
