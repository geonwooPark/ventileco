import getAllBook from '@/actions/getAllBook'
import getBookReview from '@/actions/getBookReview'
import ReviewContent from '@/components/_book/_detail/ReviewContent'
import Main from '@/components/common/Main'
import Section from '@/components/common/Section'
import NotFound from '@/not-found'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

export const revalidate = 1800

interface IParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params
  const review = await getBookReview(id)
  if (!review)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }
  const { title, _id, thumbnail } = review

  return {
    title,
    description: `도서 -${title}-에 대한 독서 후기입니다. 책을 읽고 솔직하게 작성한 솔직한 후기를 읽어보세요!`,
    openGraph: {
      title,
      description: `도서 -${title}-에 대한 독서 후기입니다. 책을 읽고 솔직하게 작성한 솔직한 후기를 읽어보세요!`,
      url: `/detail/${_id}`,
      images: {
        url: thumbnail,
      },
      type: 'website',
    },
    alternates: {
      canonical: `/detail/${_id}`,
    },
  }
}

export async function generateStaticParams() {
  const books = await getAllBook('전체')

  return books.map((book) => ({
    id: book._id.toString(),
  }))
}

export default async function page({ params }: IParams) {
  const { id } = params
  const review = await getBookReview(id)
  if (!review) return NotFound()
  const { title, authors, thumbnail, content } = review

  return (
    <Main>
      <Section>
        <div className="mb-3 flex h-[320px] items-center justify-center rounded-md bg-gray-100">
          <div className="book-cover relative">
            <Image src={thumbnail} alt={title} fill objectFit="fill" />
          </div>
        </div>
        <h2 className="mb-1 text-xl font-medium">{title}</h2>
        <p className="mb-2 text-sm text-gray-400">{authors.join(', ')}</p>
        <ReviewContent content={content} />
      </Section>
    </Main>
  )
}
