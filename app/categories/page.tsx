import { Metadata } from 'next'
import HeroSection from '../_components/hero/HeroSection'
import Section from '../_components/common/Section'
import Aside from '../_components/aside/Aside'
import Article from '../_components/article/Article'

interface SearchParams {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  if (!searchParams)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }

  return {
    title: searchParams.search as string,
    description: `${searchParams.search} 카테고리 페이지입니다.`,
    alternates: {
      canonical: `/categories?search=${searchParams.search}`,
    },
  }
}

export default async function Categories({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : ''

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
            title="카테고리"
            type="category"
            path="categories"
            page={page}
            limit={limit}
            search={search}
          />
        </div>
      </Section>
    </main>
  )
}
