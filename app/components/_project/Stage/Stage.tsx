import React from 'react'
import HighLight from './HighLight'
import Container from '@common/Container'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface StageProps {
  title: string
  image: string
  description: string
  link: string
}

export default function Stage({ title, image, description, link }: StageProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="mb-5 text-lg">
          <HighLight beforeBgColor="before:bg-blue-400 font-bold">
            {title}
          </HighLight>
        </div>
        <div className="h-full space-y-4 lg:flex lg:items-start lg:gap-4 lg:space-y-0">
          <div
            className={`relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-700 bg-cover bg-center bg-no-repeat lg:w-[600px] lg:shrink-0 ${image}`}
          />
          <div>
            <p className="mb-4">{description}</p>
            <div className="flex justify-center">
              <Link
                href={link as any}
                target="_black"
                className="flex items-center justify-center text-blue-600 duration-300 hover:opacity-70"
              >
                바로가기
                <MdKeyboardArrowRight size={20} className="mt-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
