import { Metadata } from 'next'
import Section from '@/app/components/common/Section'
import Article from '@/app/components/_blog/common/Article/Article'
import CategoryMenu from '@/app/components/_blog/common/Sidebar/CategoryMenu'
import HeroSection from '@/app/components/common/HeroSection'
import CategoryListing from '@/app/components/_blog/_categories/CategoryListing'
import { categories } from '@/app/constants'

export const revalidate = 1800

const PAGE = 1
const LIMIT = 5

interface IParams {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const category = decodeURI(params.category)

  return {
    title: category as string,
    description: `${category} 카테고리 페이지입니다.`,
    openGraph: {
      title: category as string,
      description: `${category} 카테고리 페이지입니다.`,
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
      url: `/categories/${category}`,
      type: 'website',
    },
    alternates: {
      canonical: `/categories/${category}`,
    },
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }))
}

export default async function Categories({ params }: IParams) {
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
              page={PAGE}
              limit={LIMIT}
              category={category}
            />
          </Article>
        </div>
      </Section>
    </main>
  )
}
