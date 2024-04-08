import { Metadata } from 'next'
import Section from '@common/Section'
import CategoryListing from '@blog/_categories/CategoryListing'
import { LIMIT, PAGE, categories } from '@/constants'
import Main from '@common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'
import CategoryList from '@/components/_blog/common/Category/CategoryList'
import Article from '@/components/common/Article'

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
      <Section className="pt-10">
        <ProjectTitle title="Postings" />
        <Article>
          <CategoryList paramsCategory={category} />
          <CategoryListing
            path="categories"
            page={PAGE}
            limit={LIMIT}
            category={category}
          />
        </Article>
      </Section>
    </Main>
  )
}
