'use client'

import Carousel from '@/components/common/Carousel'
import React from 'react'

interface ImageSliderProps {
  images: {
    path: string
    url: string
  }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <div className="mx-auto mb-2 h-[200px] w-[300px] md:h-[300px] md:w-[400px]">
      <Carousel images={images} />
    </div>
  )
}
