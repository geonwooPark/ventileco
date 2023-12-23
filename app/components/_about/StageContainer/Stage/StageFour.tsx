import React from 'react'
import HighLight from './HighLight'
import { skills } from '@/app/constants'
import SkillBadge from './SkillBadge'
import Container from '../../../common/Container'

export default function StageFour() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Container>
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <span className="mr-3 sm:mr-4 lg:mr-6">이러한</span>
          <HighLight beforeBgColor="before:bg-purple-400">기술스택</HighLight>
          <span>을 사용해요.</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {skills.map((item, i) => (
            <SkillBadge key={i} label={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
