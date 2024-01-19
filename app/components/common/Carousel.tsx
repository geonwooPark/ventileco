'use client'

import React from 'react'
import Slider from 'react-slick'
import { IconType } from 'react-icons'
import '@/styles/slick.css'
import '@/styles/slick-theme.css'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import Image from 'next/image'

interface ArrowProps {
  customStyle?: string
  icon?: IconType
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

interface CarouselProps {
  images: {
    path: string
    url: string
  }[]
}

export default function Carousel({ images }: CarouselProps) {
  const settings = {
    // dots: true,
    // dotsClass: 'dots_custom',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrow
        icon={MdOutlineKeyboardArrowRight}
        customStyle="absolute top-[50%] -translate-y-[50%] right-0 cursor-pointer hover:opacity-50"
      />
    ),
    prevArrow: (
      <PrevArrow
        icon={MdOutlineKeyboardArrowLeft}
        customStyle="absolute top-[50%] -translate-y-[50%] left-0 cursor-pointer hover:opacity-50 z-10"
      />
    ),
  }

  return (
    <Slider {...settings} className="h-full w-full">
      {images.map((img, i) => (
        <div key={i} className="relative h-[200px] md:h-[300px]">
          <Image src={img.url} alt="store-images" fill objectFit="cover" />
        </div>
      ))}
    </Slider>
  )
}

const NextArrow = ({ customStyle, onClick, icon: Icon }: ArrowProps) => {
  return (
    <div className={customStyle} onClick={onClick}>
      {Icon && <Icon size={30} />}
    </div>
  )
}

const PrevArrow = ({ customStyle, onClick, icon: Icon }: ArrowProps) => {
  return (
    <div className={customStyle} onClick={onClick}>
      {Icon && <Icon size={30} />}
    </div>
  )
}
