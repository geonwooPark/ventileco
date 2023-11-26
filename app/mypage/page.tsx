import React from 'react'
import Tap from '../_components/tap/Tap'
import { Metadata } from 'next'
import UserName from '../_components/UserName'
import HeroImage from '../_components/HeroImage'
import dynamic from 'next/dynamic'

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

const CommentListWrapper = dynamic(
  () => import('../_components/tap/CommentList'),
  {
    ssr: false,
  },
)

const FavListtWrapper = dynamic(() => import('../_components/tap/FavList'), {
  ssr: false,
})

const menuArr = [
  {
    name: '댓글',
    content: <CommentListWrapper />,
  },
  {
    name: '좋아요',
    content: <FavListtWrapper />,
  },
]

export default function page() {
  return (
    <>
      <section className="w-full h-[320px] md:h-[420px]">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <HeroImage
            title="My Page"
            description="내 정보 및 활동 내역을 확인해보세요"
          />
        </div>
      </section>

      <section className="my-10">
        <div className="my-container">
          <UserName />
          <div>
            <h1 className="md:text-lg mb-3">나의 활동</h1>
            <div className="mb-10">
              <Tap menuArr={menuArr} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
