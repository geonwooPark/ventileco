import React, { PropsWithChildren } from 'react'

interface SectionProps {
  className?: string
  label?: string
}

export default function Section({
  children,
  className,
  label,
}: PropsWithChildren<SectionProps>) {
  const title = <h3 className="mb-4 md:text-lg">{label}</h3>

  return (
    <section className={`pb-20 ${className}`}>
      <div className="my-container">
        {title}
        {children}
      </div>
    </section>
  )
}
