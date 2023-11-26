import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import AdminController from '@/app/_components/AdminController'
import FavoriteBtn from '@/app/_components/FavoriteBtn'
import dayjs from 'dayjs'
import EmptyState from '@/app/_components/EmptyState'
import { GetListingsType } from '@/app/_interfaces/interface'
import getPosting from '@/app/_actions/getPosting'
import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import getListings from '@/app/_actions/getListings'
import CommentSection from '@/app/_components/comment/CommentSection'

export const revalidate = 0

const EditorWrapper = dynamic(() => import('../../_components/Editor'), {
  ssr: false,
  loading: () => (
    <EmptyState label="에디터를 불러오고 있어요!" className="!h-[500px]" />
  ),
})

interface IParams {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const { postings }: GetListingsType = await getListings({
    type: 'all',
    page: 1,
    limit: 100,
  })

  return postings.map((posting) => ({
    id: posting._id.toString(),
  }))
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const posting = await getPosting(params.id)
  if (!posting)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }

  return {
    title: posting.title,
    description: posting.description,
    alternates: {
      canonical: `/detail/${posting._id}`,
    },
  }
}

export default async function Detail({ params }: IParams) {
  const posting = await getPosting(params.id)

  if (!posting) return NotFound()

  return (
    <>
      <section className="w-full h-[320px] md:h-[420px] mb-10">
        <div className="my-container h-full text-white flex flex-col justify-center items-end">
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            {posting.thumbnailURL ? (
              <Image
                src={posting.thumbnailURL}
                alt="썸네일이미지"
                fill
                placeholder="blur"
                loading="eager"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                className="object-cover brightness-50"
              />
            ) : (
              <div className="w-full h-full bg-slate-400"></div>
            )}
          </div>
          <p className="mb-2 text-sm">
            {dayjs(posting.createdAt).format('YYYY-MM-DD')}
          </p>
          <div className="flex items-center mb-2">
            <FavoriteBtn postingId={posting._id.toString()} className="mr-3" />
            <p className="text-sm md:text-base">{posting.category}</p>
          </div>
          <h1 className="w-full text-2xl md:text-4xl text-right font-bold mb-1 md:mb-3 truncate">
            {posting.title}
          </h1>
          {posting.description && (
            <p className="w-full text-sm md:text-base text-right">
              {posting.description}
            </p>
          )}
        </div>
      </section>
      <section className="mb-10">
        <div className="my-container">
          <EditorWrapper
            content={posting.content}
            theme="bubble"
            readOnly={true}
          />
        </div>
      </section>
      <section className="mb-10">
        <div className="my-container">
          <CommentSection postingId={params.id} />
        </div>
      </section>
      <section className="mb-10">
        <div className="my-container">
          <AdminController postingId={params.id} />
        </div>
      </section>
    </>
  )
}
