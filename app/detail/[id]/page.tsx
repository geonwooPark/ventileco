import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import FavoriteButton from '@/app/_components/FavoriteButton'
import dayjs from 'dayjs'
import EmptyState from '@/app/_components/common/EmptyState'
import { GetListingType } from '@/app/_interfaces/interface'
import getPosting from '@/app/_actions/getPosting'
import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import getListing from '@/app/_actions/getListing'
import Comment from '@/app/_components/comment/Comment'
import InteractionMetrics from '@/app/_components/interactionMetrics/InteractionMetrics'
import Section from '@/app/_components/common/Section'
import subBg from '/public/images/sub-bg.png'
import DeleteAndEdit from '@/app/_components/DeleteAndEdit'

export const revalidate = 1800

const EditorWrapper = dynamic(() => import('../../_components/editor/Editor'), {
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
  const { listing }: GetListingType = await getListing({
    type: 'all',
    page: 1,
    limit: 100,
  })

  return listing.map((listingItem) => ({
    id: listingItem._id.toString(),
  }))
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params
  const posting = await getPosting(id)
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
  const { id } = params
  const posting = await getPosting(id)

  if (!posting) return NotFound()

  return (
    <main>
      <section className="relative w-full h-[320px] md:h-[420px] mb-20">
        <Image
          src={posting.thumbnailURL ? posting.thumbnailURL : subBg}
          alt="썸네일이미지"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="object-cover brightness-50"
        />
        <div className="my-container h-full text-white flex flex-col justify-center items-end">
          <div className="absolute">
            <p className="mb-2 text-sm text-right">
              {dayjs(posting.createdAt).format('YYYY-MM-DD')}
            </p>
            <div className="flex justify-end items-center mb-2">
              <FavoriteButton
                postingId={posting._id.toString()}
                className="mr-3"
              />
              <p className="text-sm md:text-base">{posting.category}</p>
            </div>
            <h1 className="w-full text-2xl md:text-4xl text-right font-bold mb-1 md:mb-3">
              {posting.title}
            </h1>
            {posting.description && (
              <p className="w-full text-sm md:text-base text-right">
                {posting.description}
              </p>
            )}
          </div>
        </div>
        <InteractionMetrics postingId={posting._id.toString()} />
      </section>

      <Section>
        <EditorWrapper
          content={posting.content}
          theme="bubble"
          readOnly={true}
        />
      </Section>

      <Section label="댓글" className="!pb-10">
        <Comment postingId={params.id} />
      </Section>

      <Section className="!pb-10">
        <DeleteAndEdit postingId={params.id} />
      </Section>
    </main>
  )
}
