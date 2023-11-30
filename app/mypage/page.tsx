import React from 'react'
import Tap from '../_components/tap/Tap'
import { Metadata } from 'next'
import UserName from '../_components/UserName'
import HeroSection from '../_components/heroSection/HeroSection'
import Section from '../_components/common/Section'

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

export default function page() {
  return (
    <main>
      <HeroSection
        title="My Page"
        description="내 정보 및 활동 내역을 확인해보세요"
      />
      <Section className="!pb-10">
        <UserName />
      </Section>

      <Section label="나의 활동">
        <Tap />
      </Section>
    </main>
  )
}
