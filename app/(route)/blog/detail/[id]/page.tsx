import React from 'react'
import dynamic from 'next/dynamic'
import EmptyState from '@common/EmptyState'
import getPosting from '@/actions/getPosting'
import NotFound from '@/not-found'
import { Metadata } from 'next'
import getAllListing from '@/actions/getAllListing'
import CommentSection from '@blog/_detail/CommentSection/CommentSection'
import AdminControlSection from '@blog/_detail/AdminControlSection/AdminControlSection'
import DetailTopSection from '@blog/_detail/DetailTopSection/DetailTopSection'
import Main from '@common/Main'
import Modals from '@blog/_detail/Modals/Modals'

export const revalidate = 1800

const ContentSection = dynamic(() => import('@blog/common/Editor/Editor'), {
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
    openGraph: {
      title: posting.title,
      description: posting.description,
      url: `/detail/${posting._id}`,
      images: {
        url: posting.thumbnailURL,
      },
      type: 'website',
    },
    alternates: {
      canonical: `/detail/${posting._id}`,
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
      <ContentSection
        content={posting.content}
        theme="bubble"
        readOnly={true}
      />
      <CommentSection postingId={id} />
      <AdminControlSection postingId={id} />
      <Modals postingId={id} />
    </Main>
  )
}
