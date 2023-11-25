import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import CategoryItem from '@/app/_components/CategoryItem'
import { Suspense } from 'react'
import SkeletonListings from '../_components/listings/SkeletonListings'
import Listings from '../_components/listings/Listings'
import { Metadata } from 'next'

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

const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
]

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
    <>
      <section className="w-full h-[320px] md:h-[420px]">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            <Image
              src={mainBg}
              alt="메인 배경이미지"
              quality={100}
              fill
              placeholder="blur"
              loading="eager"
              className="object-cover brightness-50"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5">Study Log</h1>
          <p className="text-sm md:text-base">
            프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그
          </p>
        </div>
      </section>

      <section className="my-10">
        <div className="my-container">
          <div className="flex flex-col md:flex-row-reverse">
            <div className="min-w-[120px] mb-10 md:mb-0">
              <h1 className="md:text-lg mb-4">카테고리</h1>
              <ul className="flex flex-wrap md:flex-col gap-2">
                {categories.map((category, i) => {
                  return <CategoryItem key={i} category={category} />
                })}
              </ul>
            </div>
            <div className="w-full flex flex-col md:w-[calc(100%-120px)]">
              <h1 className="md:text-lg mb-4">검색 결과</h1>
              <Suspense fallback={<SkeletonListings />}>
                <Listings
                  path="categories"
                  type="category"
                  page={page}
                  limit={limit}
                  search={search}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
