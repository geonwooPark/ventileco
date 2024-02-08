import React from 'react'
import getPosting from '@/actions/getPosting'
import NotFound from '@/not-found'
import { Metadata } from 'next'
import getAllListing from '@/actions/getAllListing'
import CommentSection from '@blog/_detail/CommentSection/CommentSection'
import AdminControlSection from '@blog/_detail/AdminControlSection/AdminControlSection'
import DetailTopSection from '@blog/_detail/DetailTopSection/DetailTopSection'
import Main from '@common/Main'
import Modals from '@blog/_detail/Modals/Modals'
import ContentSection from '@/components/_blog/_detail/ContentSection'

export const dynamic = 'force-dynamic'

interface IParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params
  const posting = await getPosting(id)
  if (!posting)
    return {
      title: '404 페이지',
      description: '존재하지 않는 페이지입니다.',
    }
  const { title, description, _id, thumbnailURL } = posting

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/detail/${_id}`,
      images: {
        url: thumbnailURL,
      },
      type: 'website',
    },
    alternates: {
      canonical: `/detail/${_id}`,
    },
  }
}

export async function generateStaticParams() {
  const listing = await getAllListing({
    page: 1,
    limit: 100,
  })

  return listing.map((listingItem) => ({
    id: listingItem._id.toString(),
  }))
}

export default async function Detail({ params }: IParams) {
  const { id } = params
  const posting = await getPosting(id)
  if (!posting) return NotFound()

  return (
    <Main>
      <DetailTopSection posting={posting} />
      <ContentSection content={posting.content} />
      <CommentSection postingId={id} />
      <AdminControlSection postingId={id} />
      <Modals postingId={id} />
    </Main>
  )
}
