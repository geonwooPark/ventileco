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
  const title = <h3 className="md:text-lg mb-4">{label}</h3>

  return (
    <section className={`mb-20 ${className}`}>
      <div className="my-container">
        {title}
        {children}
      </div>
    </section>
  )
}
