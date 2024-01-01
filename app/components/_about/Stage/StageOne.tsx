import React from 'react'
import HighLight from './HighLight'
import Container from '@/app/components/common/Container'

export default function StageOne() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="mb-2 sm:mb-4 lg:mb-6">신입 프론트엔드 개발자</div>
        <div>
          <HighLight beforeBgColor="before:bg-pink-400">박건우</HighLight>
          <span>입니다.</span>
        </div>
      </Container>
    </section>
  )
}
