import React, { PropsWithChildren } from 'react'
import Container from './Container'

interface SectionProps {
  className?: string
  label?: string
}

export default function Section({
  children,
  className,
  label,
}: PropsWithChildren<SectionProps>) {
  return (
    <section className={`pb-20 ${className}`}>
      <Container>
        <h3 className="mb-4 md:text-lg">{label}</h3>
        {children}
      </Container>
    </section>
  )
}
