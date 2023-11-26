import React from 'react'
import Tap from '../_components/tap/Tap'
import { Metadata } from 'next'
import UserName from '../_components/UserName'
import HeroImage from '../_components/HeroImage'

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
    <>
      <section className="w-full h-[320px] md:h-[420px] mb-20">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <HeroImage
            title="My Page"
            description="내 정보 및 활동 내역을 확인해보세요"
          />
        </div>
      </section>

      <section className="mb-20">
        <div className="my-container">
          <UserName />
          <div>
            <h1 className="md:text-lg mb-3">나의 활동</h1>
            <div className="mb-10">
              <Tap />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
