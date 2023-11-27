import { PostingType } from '@/app/_interfaces/interface'
import getTimeDiff from '@/app/_utils/getTimeDiff'
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
              className="object-cover transition-scale duration-200 ease-in group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex justify-center items-center text-sm text-gray-100">
              No Thumbnail
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h6 className="text-sm text-gray-400">{posting.category}</h6>
          <h4 className="text-lg font-semibold mb-3 truncate">
            {posting.title}
          </h4>
          <p className="text-xs text-gray-400">
            {dayjs(posting.createdAt).format('YYYY-MM-DD')}
          </p>
        </div>
      </Link>
    </li>
  )
}
