import { Metadata } from 'next'
import Section from '@/components/common/Section'
import getCategoryListingCount from '@/actions/_blog/getCategoryListingCount'
import CategoryListing from '@/components/_blog/_categories/CategoryListing'
import { LIMIT, categories } from '@/constants'
import Main from '@/components/common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import CategoryList from '@/components/_blog/common/Category/CategoryList'
import Article from '@/components/common/Article'

export const revalidate = 1800

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
      images: '/images/og-image.png',
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
    <Main>
      <Section className="pt-10">
        <ProjectTitle title="Postings" />
        <Article>
          <CategoryList paramsCategory={category} />
          <CategoryListing
            path="categories"
            page={Number(page)}
            limit={LIMIT}
            category={category}
          />
        </Article>
      </Section>
    </Main>
  )
}
