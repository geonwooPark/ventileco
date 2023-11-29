import HeroSection from '../../_components/heroSection/HeroSection'
import Section from '../../_components/common/Section'
import Aside from '../../_components/aside/Aside'
import Article from '../../_components/article/Article'
import getPostingCount from '@/app/_actions/getPostingCount'

export const revalidate = 600

const LIMIT = 5

interface IParams {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const postingCount = await getPostingCount()
  const lastPageNum = Math.ceil(postingCount / LIMIT)

  return Array.from({ length: lastPageNum - 1 }).map((_, i) => ({
    page: (i + 2).toString(),
  }))
}

export default async function Postings({ params }: IParams) {
  const { page } = params

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
            page={Number(page)}
            limit={LIMIT}
          />
        </div>
      </Section>
    </main>
  )
}
