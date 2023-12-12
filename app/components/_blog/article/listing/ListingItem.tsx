import { PostingType } from '@/app/interfaces/interface'
import getTimeDiff from '@/app/utils/getTimeDiff'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ListingProps {
  posting: PostingType
}

export default function ListingItem({ posting }: ListingProps) {
  return (
    <li className="mb-6 group md:mb-12">
      <Link
        href={`/blog/detail/${posting._id}`}
        className="flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-[270px] h-[280px] md:h-[180px] border rounded-lg overflow-hidden">
          {posting.thumbnailURL ? (
            <Image
              src={posting.thumbnailURL && posting.thumbnailURL}
              alt="썸네일이미지"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              className="object-cover duration-200 ease-in transition-scale group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-100 bg-gray-300">
              No Thumbnail
            </div>
          )}
        </div>
        <div className="md:w-[calc(100%-270px)] flex flex-col justify-between md:px-6 md:py-2">
          <div className="mt-3 mb-4 md:mt-0">
            <p className="text-sm text-gray-400 mb-1.5 md:mb-4">
              {posting.category}
            </p>
            <h3 className="text-lg font-semibold mb-1.5 truncate">
              {posting.title}
            </h3>
            <p className="text-sm text-gray-500 break-words">
              {posting.description.length > 60
                ? posting.description.slice(0, 60) + '...'
                : posting.description}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {getTimeDiff(dayjs(posting.createdAt))}
          </p>
        </div>
      </Link>
    </li>
  )
}
