import React from 'react'
import HighLight from './HighLight'
import Container from '@common/Container'

export default function StageTwo() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <HighLight beforeBgColor="before:bg-green-400">산책</HighLight>
          <span className="mr-3 sm:mr-4 lg:mr-6">과</span>
          <HighLight beforeBgColor="before:bg-green-400">카페</HighLight>
          <span>를</span>
        </div>
        <div>
          <span>좋아합니다.</span>
        </div>
      </Container>
    </section>
  )
}
