import React, { PropsWithChildren } from 'react'
import Container from './Container'

interface SectionProps {
  className?: string
  label?: string
  innerKey?: number
}

export default function Section({
  children,
  className,
  label,
  innerKey,
}: PropsWithChildren<SectionProps>) {
  return (
    <section className={`bg-white pb-20 ${className}`} key={innerKey}>
      <Container>
        <h3 className="mb-4 text-lg font-medium">{label}</h3>
        {children}
      </Container>
    </section>
  )
}
