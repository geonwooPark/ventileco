'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '@/styles/recommended-book-slider.module.css'
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
    <div
      className={`${styles.wrapper} flex h-[240px] w-full items-center pl-[calc((100%+50px)/2)] lg:pl-[calc((100%-200px)/2)] xl:pl-[calc((100%-400px)/2)]`}
    >
      <Slider {...settings}>
        {recommendedBooks.map((book) => (
          <Link
            href={`/book/detail/${book._id}`}
            key={book._id}
            className="book-cover relative"
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
