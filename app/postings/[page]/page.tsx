import HeroSection from '../../_components/heroSection/HeroSection'
import Section from '../../_components/common/Section'
import Article from '../../_components/article/Article'
import getAllListingCount from '@/app/_actions/getAllListingCount'
import CategoryMenu from '@/app/_components/category/CategoryMenu'
import getAllListing from '@/app/_actions/getAllListing'

export const revalidate = 1800

const LIMIT = 5

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
  const listing = await getAllListing({
    page: Number(page),
    limit: LIMIT,
  })
  const listingCount = await getAllListingCount()

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
            path="postings"
            page={Number(page)}
            limit={LIMIT}
            listing={listing}
            listingCount={listingCount}
          />
        </div>
      </Section>
    </main>
  )
}
