'use client'

import React from 'react'
import Image from 'next/image'
import Slider from '@/components/common/Slider'

interface ImageSliderProps {
  images: {
    path: string
    url: string
  }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <Slider gap={16} slideLength={images.length}>
      {images.map((img) => (
        <div key={img.path} className="mx-auto aspect-[4/3]">
          <div className="relative h-full w-[400px]">
            <Image
              src={img.url}
              alt="store-images"
              fill
              objectFit="cover"
              className="block-drag"
            />
          </div>
        </div>
      ))}
    </Slider>
  )
}
