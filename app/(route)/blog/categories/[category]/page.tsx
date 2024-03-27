import { Metadata } from 'next'
import Section from '@common/Section'
import HeroSection from '@common/HeroSection'
import CategoryListing from '@blog/_categories/CategoryListing'
import { LIMIT, PAGE, categories } from '@/constants'
import SideBar from '@blog/common/Sidebar/SideBar'
import Main from '@common/Main'
import Article from '@blog/common/Article/Article'

export const revalidate = 1800

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
      images: '/images/og-image.png',
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
    <Main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <SideBar paramsCategory={category} />
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
    </Main>
  )
}
