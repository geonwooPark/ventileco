'use client'

import { PostingType } from '@/interfaces/interface'
import getTimeDiff from '@/utils/getTimeDiff'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

interface ListingProps {
  posting: PostingType
}

export default function ListingItem({ posting }: ListingProps) {
  const router = useRouter()
  const { _id, thumbnailURL, category, title, description, createdAt } = posting

  return (
    <li
      onClick={() => router.push(`/blog/detail/${_id}`)}
      className="group mb-6 flex cursor-pointer flex-col rounded-md border border-beige-light bg-brown-dark px-4 py-3 md:flex-row"
    >
      <div className="relative h-[280px] w-full overflow-hidden rounded-md md:h-[180px] md:w-[270px]">
        {thumbnailURL ? (
          <Image
            src={thumbnailURL && thumbnailURL}
            alt="썸네일이미지"
            fill
            placeholder="blur"
            blurDataURL={process.env.NEXT_PUBLIC_BLUR_URL as string}
            className="object-cover duration-200 ease-in group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-beige-normal text-sm text-brown-dark">
            No Thumbnail
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between md:w-[calc(100%-270px)] md:px-6 md:py-2">
        <div className="mb-4 mt-3 md:mt-0">
          <p className="mb-1.5 text-sm text-beige-dark md:mb-4">{category}</p>
          <h3 className="mb-1.5 truncate text-lg text-beige-light">{title}</h3>
          <p className="break-words text-sm text-beige-normal">
            {description.length > 60
              ? description.slice(0, 60) + '...'
              : description}
          </p>
        </div>
        <p className="text-xs text-beige-dark">
          {getTimeDiff(dayjs(createdAt).tz())}
        </p>
      </div>
    </li>
  )
}
