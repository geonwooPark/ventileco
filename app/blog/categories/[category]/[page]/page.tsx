import { Metadata } from 'next'
import Section from '@/app/components/common/Section'
import Article from '@/app/components/_blog/common/Article/Article'
import { categories } from '@/app/utils/categoryArr'
import getCategoryListingCount from '@/app/actions/getCategoryListingCount'
import CategoryMenu from '@/app/components/_blog/common/Sidebar/CategoryMenu'
import HeroSection from '@/app/components/common/HeroSection'
import CategoryListing from '@/app/components/_blog/_categories/CategoryListing'

export const revalidate = 1800

const LIMIT = 5

interface IParams {
  params: {
    category: string
    page: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { page } = params
  const category = decodeURI(params.category)

  return {
    title: category as string,
    description: `${category} 카테고리 페이지입니다.`,
    openGraph: {
      title: category as string,
      description: `${category} 카테고리 페이지입니다.`,
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
  const { page } = params
  const category = decodeURI(params.category)

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <CategoryMenu paramsCategory={category} />
          <Article title="검색 결과">
            <CategoryListing
              path="categories"
              page={Number(page)}
              limit={LIMIT}
              category={category}
            />
          </Article>
        </div>
      </Section>
    </main>
  )
}
