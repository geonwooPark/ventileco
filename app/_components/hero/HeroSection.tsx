import React from 'react'
import HeroImage from './HeroImage'

interface HeroSectionProps {
  title: string
  description: string
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section className="w-full h-[320px] md:h-[420px] mb-20">
      <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
        <HeroImage title={title} description={description} />
      </div>
    </section>
  )
}
