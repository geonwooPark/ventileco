import { Metadata } from 'next'
import HeroSection from '../../../_components/heroSection/HeroSection'
import Section from '../../../_components/common/Section'
import Article from '../../../_components/article/Article'
import { categories } from '@/app/_utils/categoryArr'
import CategoryMenu from '@/app/_components/category/CategoryMenu'
import getCategoryListing from '@/app/_actions/getCategoryListing'
import getCategoryListingCount from '@/app/_actions/getCategoryListingCount'

export const revalidate = 1800

const LIMIT = 5

interface IParams {
  params: {
    category: string
    page: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { category, page } = params

  return {
    title: decodeURI(category) as string,
    description: `${decodeURI(category)} 카테고리 페이지입니다.`,
    openGraph: {
      title: decodeURI(category) as string,
      description: `${decodeURI(category)} 카테고리 페이지입니다.`,
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
      url: `/categories/${category}/${page}`,
      type: 'website',
    },
    alternates: {
      canonical: `/categories/${category}/${page}`,
    },
  }
}

export async function generateStaticParams() {
  let result: { category: string; page: string }[] = []
  for (const category of categories) {
    const listingCount = await getCategoryListingCount(category)
    const lastPageNum = Math.ceil(listingCount / LIMIT)
    const res = Array.from({ length: lastPageNum - 1 }).map((_, i) => {
      return { category, page: (i + 2).toString() }
    })
    result = [...result, ...res]
  }

  return result
}

export default async function Categories({ params }: IParams) {
  const { category, page } = params
  const listing = await getCategoryListing({
    page: Number(page),
    limit: LIMIT,
    category: decodeURI(category),
  })
  const listingCount = await getCategoryListingCount(category)

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <CategoryMenu paramsCategory={params.category} />
          <Article
            title="검색 결과"
            path="categories"
            page={Number(page)}
            limit={LIMIT}
            listing={listing}
            listingCount={listingCount}
            category={category}
          />
        </div>
      </Section>
    </main>
  )
}
