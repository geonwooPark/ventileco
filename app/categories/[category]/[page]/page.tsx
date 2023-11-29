import { Metadata } from 'next'
import HeroSection from '../../../_components/heroSection/HeroSection'
import Section from '../../../_components/common/Section'
import Aside from '../../../_components/aside/Aside'
import Article from '../../../_components/article/Article'
import { categories } from '@/app/_utils/categoryArr'

export const revalidate = 600

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
    alternates: {
      canonical: `/categories/${category}/${page}`,
    },
  }
}

export async function generateStaticParams() {
  let arr: {
    category: string
    page: string
  }[] = []
  categories.map((category) => {
    Array.from({ length: 2 }).forEach((_, i) => {
      arr = [...arr, { category, page: (i + 2).toString() }]
    })
  })

  return arr
}

export default async function Categories({ params }: IParams) {
  const { category, page } = params

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <Aside paramsCategory={params.category} />
          <Article
            title="카테고리"
            type="category"
            path="categories"
            page={Number(page)}
            limit={LIMIT}
            category={category}
          />
        </div>
      </Section>
    </main>
  )
}
