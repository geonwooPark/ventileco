import { PostingType } from '@/app/interfaces/interface'
import dayjs from '@/app/utils/dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PopularListingItemProps {
  posting: PostingType
}

export default function PopularListingItem({
  posting,
}: PopularListingItemProps) {
  return (
    <li className="group">
      <Link href={`/blog/detail/${posting._id}`}>
        <div className="relative mb-2 h-[160px] w-[213px] overflow-hidden rounded-lg border lg:h-[224px] lg:w-[298px] xl:h-[267px] xl:w-[357px]">
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
        <div className="flex flex-col justify-between">
          <p className="text-sm text-gray-400">{posting.category}</p>
          <h3 className="mb-3 truncate text-lg font-semibold">
            {posting.title}
          </h3>
          <p className="text-xs text-gray-400">
            {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
          </p>
        </div>
      </Link>
    </li>
  )
}
