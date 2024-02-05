'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '@/styles/store-image-slider.module.css'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import Image from 'next/image'
import { IconType } from 'react-icons'

interface ArrowProps {
  customStyle?: string
  icon?: IconType
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

interface ImageSliderProps {
  images: {
    path: string
    url: string
  }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const settings = {
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
    <div
      className={`${styles.wrapper} mx-auto mb-2 h-[200px] w-[300px] md:h-[300px] md:w-[400px]`}
    >
      <Slider {...settings} className="h-full w-full">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-[200px] w-[300px] md:h-[300px] md:w-[400px]"
          >
            <Image src={img.url} alt="store-images" fill objectFit="cover" />
          </div>
        ))}
      </Slider>
    </div>
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
