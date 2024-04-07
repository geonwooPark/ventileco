import React from 'react'
import Container from '@common/Container'
import Link from 'next/link'
import ProjectTitle from './ProjectTitle'

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
        <ProjectTitle title={title} />
        <div className="h-full space-y-4 lg:flex lg:items-start lg:gap-4 lg:space-y-0">
          <div
            className={`card-shadowed relative mx-auto aspect-[16/9] w-full rounded-md bg-cover bg-center bg-no-repeat lg:w-[600px] lg:shrink-0 ${image}`}
          />
          <div>
            <p className="mb-4">{description}</p>
            <div className="flex justify-center">
              <Link
                href={link as any}
                target="_black"
                className="button-shadowed flex items-center justify-center px-6 py-3 font-point text-brown-dark duration-300"
              >
                Visit Now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
