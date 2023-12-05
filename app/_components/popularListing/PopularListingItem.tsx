import { PostingType } from '@/app/_interfaces/interface'
import dayjs from 'dayjs'
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
      <Link href={`/detail/${posting._id}`}>
        <div className="relative w-[213px] h-[160px] lg:w-[298px] lg:h-[224px] xl:w-[357px] xl:h-[267px] border rounded-lg overflow-hidden mb-2">
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
        <div className="flex flex-col justify-between">
          <p className="text-sm text-gray-400">{posting.category}</p>
          <h3 className="mb-3 text-lg font-semibold truncate">
            {posting.title}
          </h3>
          <p className="text-xs text-gray-400">
            {dayjs(posting.createdAt).format('YYYY-MM-DD')}
          </p>
        </div>
      </Link>
    </li>
  )
}
