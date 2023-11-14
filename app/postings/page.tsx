import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import CategoryItem from '../components/CategoryItem'
import { Suspense } from 'react'
import SkeletonListings from '../components/listings/SkeletonListings'
import Listings from '../components/listings/Listings'

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
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            <Image
              src={mainBg}
              alt="메인 배경이미지"
              quality={100}
              fill
              placeholder="blur"
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
              <h1 className="md:text-lg mb-4">전체 게시글</h1>
              <Suspense fallback={<SkeletonListings />}>
                <Listings
                  path="postings"
                  url={`http://127.0.0.1:3000/api/postingList?page=${page}&limit=${limit}`}
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
