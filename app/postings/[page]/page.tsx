import HeroSection from '../../_components/heroSection/HeroSection'
import Section from '../../_components/common/Section'
import Article from '../../_components/article/Article'
import getListingCount from '@/app/_actions/getListingCount'
import CategoryMenu from '@/app/_components/category/CategoryMenu'

export const revalidate = 1800

const LIMIT = 5

interface IParams {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const listingCount = await getListingCount()
  const lastPageNum = Math.ceil(listingCount / LIMIT)

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
          <CategoryMenu />
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
