'use client'

import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { PostingType } from '@/app/utils/getPosting'
import EmptyState from '@/app/components/EmptyState'
import Listing from '@/app/components/listings/Listing'

export default function page() {
  const keyword = useSearchParams().get('keyword')
  const [postings, setPostings] = useState<PostingType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await fetch(`/api/search?keyword=${keyword}`, { method: 'GET' })
          .then((res) => res.json())
          .then((result) => {
            if (!result.error) {
              setPostings(result)
            }
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [keyword])

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
          <div className="flex flex-col mb-10">
            <div className="w-full md:h-auto">
              <h1 className="md:text-lg mb-4">검색 결과</h1>
              {isLoading ? (
                <EmptyState label={'검색중이에요!'} />
              ) : postings.length === 0 ? (
                <EmptyState label={'검색 결과가 없어요!'} />
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
        </div>
      </section>
    </>
  )
}
