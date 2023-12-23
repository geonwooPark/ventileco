import React from 'react'
import HighLight from './HighLight'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'
import Container from '../../../common/Container'

export default function StageFive() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container className="flex flex-col items-center">
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <span className="mr-3 sm:mr-4 lg:mr-6">더 많은</span>
          <HighLight beforeBgColor="before:bg-orange-400">프로젝트</HighLight>
          <span>가 궁금하시면</span>
        </div>

        <div className="mb-2 sm:mb-4 lg:mb-6">
          <span>아래에 방문해주세요.</span>
        </div>

        <Link
          href={'https://github.com/geonwooPark'}
          target="_black"
          className="flex items-center text-base text-blue-600 duration-300 hover:opacity-70"
        >
          바로가기
          <MdKeyboardArrowRight size={20} className="mt-1" />
        </Link>
      </Container>
    </section>
  )
}
