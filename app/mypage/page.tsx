import React from 'react'
import Tap from '../_components/tap/Tap'
import { Metadata } from 'next'
import HeroSection from '../_components/heroSection/HeroSection'
import Section from '../_components/common/Section'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import UserInfo from '../_components/UserInfo'

export default async function page() {
  const session = await getServerSession(authOptions)

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
        <Tap />
      </Section>
    </main>
  )
}
