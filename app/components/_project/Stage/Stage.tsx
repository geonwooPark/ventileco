import React from 'react'
import Link from 'next/link'
import ProjectTitle from '../../common/ProjectTitle'
import Section from '@/components/common/Section'

interface StageProps {
  title: string
  image: string
  description: string
  link: string
}

export default function Stage({ title, image, description, link }: StageProps) {
  return (
    <Section className="flex h-screen items-center justify-center !pb-0">
      <ProjectTitle title={title} />
      <div className="mb-10 h-full space-y-4 lg:flex lg:items-start lg:gap-6 lg:space-y-0">
        <div
          className={`card-shadowed relative mx-auto aspect-[16/9] w-full rounded-md bg-cover bg-center bg-no-repeat lg:w-[600px] lg:shrink-0 ${image}`}
        />
        <p className="mb-4">{description}</p>
      </div>
      <div className="flex justify-center">
        <Link
          href={link as any}
          target="_black"
          className="button-shadowed flex items-center justify-center px-6 py-3 font-point text-brown-dark duration-300"
        >
          Visit Now
        </Link>
      </div>
    </Section>
  )
}
{
  /* <section className="flex h-full w-full items-center justify-center"> */
}
