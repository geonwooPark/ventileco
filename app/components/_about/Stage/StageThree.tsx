import React from 'react'
import HighLight from './HighLight'
import Container from '@common/Container'

export default function StageThree() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <span className="mr-3 sm:mr-4 lg:mr-6">요즘은</span>
          <HighLight beforeBgColor="before:bg-blue-400">
            서버 사이드 렌더링
          </HighLight>
          <span>에</span>
        </div>
        <div>관심을 두고 있습니다.</div>
      </Container>
    </section>
  )
}
