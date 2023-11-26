import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import { Suspense } from 'react'
import SkeletonListings from '../_components/listings/SkeletonListings'
import Listings from '../_components/listings/Listings'
import { Metadata } from 'next'
import HeroImage from '../_components/HeroImage'

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과 페이지입니다.',
  robots: {
    index: false,
    nocache: true,
  },
}

export default async function Search({
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
      <section className="w-full h-[320px] md:h-[420px] mb-20">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <HeroImage
            title="Study Log"
            description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
          />
        </div>
      </section>

      <section className="mb-20">
        <div className="my-container">
          <div className="flex flex-col">
            <div className="w-full md:h-auto">
              <h1 className="md:text-lg mb-4">검색 결과</h1>
              <Suspense fallback={<SkeletonListings />}>
                <Listings
                  path="search"
                  type="search"
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
