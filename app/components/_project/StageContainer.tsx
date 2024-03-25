'use client'

import React from 'react'
import ScrollIcon from './ScrollIcon'
import Stage from './Stage/Stage'
import { projects } from '@/constants'
import useProjectScroll from '@/hooks/useProjectScroll'

export default function StageContainer() {
  const { containerRef, showScrollIcon } = useProjectScroll(projects.length)

  return (
    <div
      className="hide-scroll h-full w-full overflow-scroll"
      ref={containerRef}
    >
      {showScrollIcon && <ScrollIcon />}
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
