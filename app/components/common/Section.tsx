import React, { PropsWithChildren } from 'react'
import Container from './Container'

interface SectionProps {
  className?: string
  innerKey?: number
}

export default function Section({
  children,
  className,
  innerKey,
}: PropsWithChildren<SectionProps>) {
  return (
    <section className={`pb-20 ${className}`} key={innerKey}>
      <Container>{children}</Container>
    </section>
  )
}
