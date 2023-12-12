import React from 'react'
import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'

interface HeroSectionProps {
  title: string
  description: string
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] mb-20">
      <Image
        src={mainBg}
        alt="메인 배경이미지"
        quality={100}
        fill
        placeholder="blur"
        loading="eager"
        className="object-cover brightness-50"
      />
      <div className="flex flex-col items-end justify-center h-full text-right text-white my-container">
        <div className="absolute">
          <p className="mb-5 text-4xl font-bold md:text-6xl">{title}</p>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </section>
  )
}
