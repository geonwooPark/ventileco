import React from 'react'
import HighLight from './HighLight'
import Container from '@common/Container'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface StageProps {
  title: string
  image: StaticImageData
  description: string
  link: string
}

export default function Stage({ title, image, description, link }: StageProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="space-y-5 text-white">
          <div className="text-center text-lg">
            <HighLight beforeBgColor="before:bg-blue-400 font-bold">
              {title}
            </HighLight>
          </div>
          <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-700">
            <Image
              src={image}
              alt="project"
              quality={100}
              fill
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <p className="text-sm">{description}</p>
          <Link
            href={link as any}
            target="_black"
            className="flex items-center justify-center text-blue-600 duration-300 hover:opacity-70"
          >
            바로가기
            <MdKeyboardArrowRight size={20} className="mt-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
