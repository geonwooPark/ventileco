import React from 'react'
import Tap from '../_components/tap/Tap'
import { Metadata } from 'next'
import HeroSection from '../_components/heroSection/HeroSection'
import Section from '../_components/common/Section'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import UserInfo from '../_components/UserInfo'
import Spinner from '../_components/common/Spinner'

const MyCommentList = dynamic(
  () => import('../_components/tap/MyCommentList'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner width="w-6" height="w-6" fillColor="fill-blue-600" />
      </div>
    ),
  },
)
const MyFavList = dynamic(() => import('../_components/tap/MyFavList'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner width="w-6" height="w-6" fillColor="fill-blue-600" />
    </div>
  ),
})

export const metadata: Metadata = {
  title: {
    absolute: '마이페이지',
  },
  description: '내 정보 및 활동 내역을 확인해보세요',
  robots: {
    index: false,
    nocache: true,
  },
}

export default async function page() {
  const session = await getServerSession(authOptions)

  const menuArr = [
    {
      name: '댓글',
      content: <MyCommentList session={session} />,
    },
    {
      name: '좋아요',
      content: <MyFavList session={session} />,
    },
  ]

  return (
    <main>
      <HeroSection
        title="My Page"
        description="내 정보 및 활동 내역을 확인해보세요"
      />
      <Section className="!pb-10">
        <UserInfo session={session} />
      </Section>

      <Section label="나의 활동">
        <Tap menuArr={menuArr} />
      </Section>
    </main>
  )
}
