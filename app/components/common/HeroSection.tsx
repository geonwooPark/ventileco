import React from 'react'
import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'

interface HeroSectionProps {
  title: string
  description: string
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section className="relative mb-20 h-[320px] w-full md:h-[420px]">
      <Image
        src={mainBg}
        alt="메인 배경이미지"
        quality={100}
        fill
        placeholder="blur"
        loading="eager"
        className="object-cover brightness-50"
      />
      <div className="my-container flex h-full flex-col items-end justify-center text-right text-white">
        <div className="absolute">
          <p className="mb-5 text-4xl font-bold md:text-6xl">{title}</p>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </section>
  )
}
