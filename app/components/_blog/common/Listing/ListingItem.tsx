import { PostingType } from '@/app/interfaces/interface'
import getTimeDiff from '@/app/utils/getTimeDiff'
import dayjs from '@/app/utils/dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ListingProps {
  posting: PostingType
}

export default function ListingItem({ posting }: ListingProps) {
  return (
    <li className="group mb-6 md:mb-12">
      <Link
        href={`/blog/detail/${posting._id}`}
        className="flex flex-col md:flex-row"
      >
        <div className="relative h-[280px] w-full overflow-hidden rounded-lg border md:h-[180px] md:w-[270px]">
          {posting.thumbnailURL ? (
            <Image
              src={posting.thumbnailURL && posting.thumbnailURL}
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
            <p className="mb-1.5 text-sm text-gray-400 md:mb-4">
              {posting.category}
            </p>
            <h3 className="mb-1.5 truncate text-lg font-semibold">
              {posting.title}
            </h3>
            <p className="break-words text-sm text-gray-500">
              {posting.description.length > 60
                ? posting.description.slice(0, 60) + '...'
                : posting.description}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {getTimeDiff(dayjs(posting.createdAt).tz())}
          </p>
        </div>
      </Link>
    </li>
  )
}
