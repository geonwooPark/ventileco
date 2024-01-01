import React from 'react'
import Section from '@/app/components/common/Section'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserInfo from '@/app/components/_mypage/UserInfo'
import HeroSection from '@/app/components/common/HeroSection'
import ActionLogTab from '@/app/components/_mypage/ActionLogtab/ActionLogTab'
import Main from '@/app/components/common/Main'

export async function generateMetadata() {
  return {
    title: '마이페이지',
    description: '내 정보 및 활동 내역을 확인할 수 있는 페이지입니다.',
    openGraph: {
      title: '마이페이지',
      description: '내 정보 및 활동 내역을 확인할 수 있는 페이지입니다.',
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
      url: `/mypage`,
      type: 'website',
    },
  }
}

export default async function page() {
  const session = await getServerSession(authOptions)

  return (
    <Main>
      <HeroSection
        title="My Page"
        description="내 정보 및 활동 내역을 확인해보세요"
      />
      <Section className="!pb-10">
        <UserInfo session={session} />
      </Section>

      <Section label="나의 활동">
        <ActionLogTab />
      </Section>
    </Main>
  )
}
