'use client'

import React from 'react'
import ScrollIcon from './ScrollIcon'
import Stage from './Stage/Stage'
import { projects } from '@/constants'
import useFullPageScroll from '@/hooks/useFullPageScroll'

export default function StageContainer() {
  const { containerRef, isScrollEnd } = useFullPageScroll(projects.length)

  return (
    <div
      className="hide-scroll h-full w-full overflow-scroll text-beige-light"
      ref={containerRef}
    >
      {!isScrollEnd && <ScrollIcon />}
      {projects.map((project) => (
        <Stage
          key={project.id}
          title={project.title}
          image={project.image}
          description={project.description}
          link={project.link}
        />
      ))}
    </div>
  )
}
