import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import EmptyState from '@/app/components/EmptyState'
import Listing from '@/app/components/listings/Listing'
import CategoryItem from '@/app/components/CategoryItem'
import getCategoryList from '../actions/getCategoryList'
import Pagenation from '../components/Pagenation'

const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
]

export default async function page({
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
  const { postings, postingCount } = await getCategoryList({
    search,
    page,
    limit,
  })

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

      <section className="mt-10">
        <div className="my-container">
          <div className="flex flex-col md:flex-row-reverse mb-5">
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
              {postingCount === 0 ? (
                <EmptyState label={'작성된 게시글이 없어요!'} />
              ) : (
                <main>
                  <ul>
                    {postings?.map((posting) => {
                      return <Listing key={posting._id} posting={posting} />
                    })}
                  </ul>
                </main>
              )}
            </div>
          </div>
          <div className="mb-10">
            <Pagenation
              path="categories"
              search={search}
              postingCount={postingCount}
              page={page}
            />
          </div>
        </div>
      </section>
    </>
  )
}
