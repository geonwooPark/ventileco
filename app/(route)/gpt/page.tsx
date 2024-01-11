import GPTChat from '@gpt/GPTChat'
import React from 'react'

export async function generateMetadata() {
  return {
    title: '개인비서 챗봇 PETER',
    description: '개인비서 챗봇 PETER를 사용할 수 있는 페이지입니다.',
    openGraph: {
      title: '개인비서 챗봇 PETER',
      description: '개인비서 챗봇 PETER를 사용할 수 있는 페이지입니다.',
      images:
        'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
      url: `/gpt`,
      type: 'website',
    },
  }
}

export default function page() {
  return <GPTChat />
}
