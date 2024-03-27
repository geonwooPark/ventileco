import StageContainer from '@/components/_project/StageContainer'
import React from 'react'

export async function generateMetadata() {
  return {
    title: '프로젝트',
    description: '그동안 진행해온 프로젝트를 소개하는 페이지입니다.',
    openGraph: {
      title: '프로젝트',
      description: '그동안 진행해온 프로젝트를 소개하는 페이지입니다.',
      images: '/images/og-image.png',
      url: `/project`,
      type: 'website',
    },
  }
}

export default function page() {
  return (
    <div className={`h-full w-full`}>
      <StageContainer />
    </div>
  )
}
