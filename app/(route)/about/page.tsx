import StageContainer from '@/app/components/_about/StageContainer'
import React from 'react'

export async function generateMetadata() {
  return {
    title: '소개',
    description: '프론트엔드 개발자 박건우에 대한 소개 페이지입니다.',
    openGraph: {
      title: '소개',
      description: '프론트엔드 개발자 박건우에 대한 소개 페이지입니다.',
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
      url: `/about`,
      type: 'website',
    },
  }
}

export default function page() {
  return (
    <div
      className={`h-full w-full text-center text-2xl text-gray-400 sm:text-4xl lg:text-6xl`}
    >
      <StageContainer />
    </div>
  )
}
