import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import getCurrentUser from '@/app/actions/getCurrentUser'
import AdminController from '@/app/components/AdminController'
import FavoriteBtn from '@/app/components/FavoriteBtn'
import Comment from '@/app/components/comment/Comment'
import dayjs from 'dayjs'
import EmptyState from '@/app/components/EmptyState'
import {
  CommentUserType,
  GetListingsType,
  UserType,
} from '@/app/interfaces/interface'
import getComment from '@/app/actions/getComment'
import getPosting from '@/app/actions/getPosting'
import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import getListings from '@/app/actions/getListings'

// const EditorWrapper = dynamic(() => import('../../components/Editor'), {
//   ssr: false,
//   loading: () => (
//     <EmptyState label="에디터를 불러오고 있어요!" className="!h-[500px]" />
//   ),
// })

interface IParams {
  params: {
    id: string
  }
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
  const currentUser: UserType = await getCurrentUser()
  const posting = await getPosting(params.id)
  const comments: CommentUserType[] = await getComment(params.id)

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
            <FavoriteBtn
              currentUser={currentUser}
              postingId={posting._id.toString()}
              className="mr-3"
            />
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
      <section>
        <div className="my-container">
          <div className="mb-10">
            {/* <EditorWrapper
              content={posting.content}
              theme="bubble"
              readOnly={true}
            /> */}
          </div>
          <div className="mb-10">
            <Comment comments={comments} currentUser={currentUser} />
          </div>
          {currentUser && currentUser.role === 'admin' && (
            <div className="mb-5">
              <AdminController />
            </div>
          )}
        </div>
      </section>
    </>
  )
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
