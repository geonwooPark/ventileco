'use client'

import React from 'react'
import Slider from 'react-slick'
import '@/styles/recommended-book-slider.css'
import Image from 'next/image'
import Link from 'next/link'
import { BookReviewType } from '@/interfaces/interface'

interface RecommendedBookSliderProps {
  recommendedBooks: BookReviewType[]
}

const settings = {
  autoplay: true,
  infinite: true,
  autoplaySpeed: 2000,
  draggable: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: false,
}

export default function RecommendedBookSlider({
  recommendedBooks,
}: RecommendedBookSliderProps) {
  return (
    <div className="absolute bottom-0 flex h-[240px] w-full items-center pl-[calc((100%+50px)/2)] md:bottom-10 lg:pl-[calc((100%-200px)/2)] xl:pl-[calc((100%-400px)/2)]">
      <Slider {...settings}>
        {recommendedBooks.map((book) => (
          <Link
            href={`/`}
            key={book._id}
            className="relative mx-auto mb-3 h-[200px] w-[160px] overflow-hidden rounded-[3px] border-b-[2px] border-black/20 shadow-xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-r after:from-black/10 after:from-0% after:via-white/30 after:via-5% after:to-white/10 after:to-90%"
          >
            <Image
              src={book.thumbnail}
              alt={book.title}
              fill
              objectFit="fill"
            />
          </Link>
        ))}
      </Slider>
    </div>
  )
}
