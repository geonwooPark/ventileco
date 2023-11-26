import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import CategoryItem from '../_components/CategoryItem'
import { Suspense } from 'react'
import SkeletonListings from '../_components/listings/SkeletonListings'
import Listings from '../_components/listings/Listings'
import HeroImage from '../_components/HeroImage'

const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
]

export default async function Postings({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams?.limit === 'string' ? Number(searchParams.limit) : 10

  return (
    <>
      <section className="w-full h-[320px] md:h-[420px]">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <HeroImage
            title="Study Log"
            description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
          />
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
              <h1 className="md:text-lg mb-4">전체 게시글</h1>
              <Suspense fallback={<SkeletonListings />}>
                <Listings
                  path="postings"
                  type="all"
                  page={page}
                  limit={limit}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
