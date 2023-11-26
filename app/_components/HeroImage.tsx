import Image from 'next/image'
import React from 'react'
import mainBg from '/public/images/main-bg.png'

interface HeroImage {
  title: string
  description: string
}

export default function HeroImage({ title, description }: HeroImage) {
  return (
    <div>
      <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
        <Image
          src={mainBg}
          alt="메인 배경이미지"
          quality={100}
          fill
          placeholder="blur"
          loading="eager"
          className="object-cover brightness-50"
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-5">{title}</h1>
      <p className="text-sm md:text-base">{description}</p>
    </div>
  )
}
