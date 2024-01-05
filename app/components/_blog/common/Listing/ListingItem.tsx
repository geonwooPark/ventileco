import { PostingType } from '@/interfaces/interface'
import getTimeDiff from '@/utils/getTimeDiff'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ListingProps {
  posting: PostingType
}

export default function ListingItem({ posting }: ListingProps) {
  const { _id, thumbnailURL, category, title, description, createdAt } = posting
  return (
    <li className="group mb-6 md:mb-12">
      <Link href={`/blog/detail/${_id}`} className="flex flex-col md:flex-row">
        <div className="relative h-[280px] w-full overflow-hidden rounded-lg border md:h-[180px] md:w-[270px]">
          {thumbnailURL ? (
            <Image
              src={thumbnailURL && thumbnailURL}
              alt="썸네일이미지"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              className="object-cover duration-200 ease-in group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm text-gray-100">
              No Thumbnail
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between md:w-[calc(100%-270px)] md:px-6 md:py-2">
          <div className="mb-4 mt-3 md:mt-0">
            <p className="mb-1.5 text-sm text-gray-400 md:mb-4">{category}</p>
            <h3 className="mb-1.5 truncate text-lg font-semibold">{title}</h3>
            <p className="break-words text-sm text-gray-500">
              {description.length > 60
                ? description.slice(0, 60) + '...'
                : description}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {getTimeDiff(dayjs(createdAt).tz())}
          </p>
        </div>
      </Link>
    </li>
  )
}
