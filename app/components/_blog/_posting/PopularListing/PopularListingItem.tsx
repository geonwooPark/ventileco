import { PostingType } from '@/interfaces/interface'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PopularListingItemProps {
  posting: PostingType
}

export default function PopularListingItem({
  posting,
}: PopularListingItemProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/blog/detail/${posting._id}`)}
      className="card-shadowed group aspect-[4/3] h-full w-full rounded-md px-4 py-3"
    >
      <div className="relative mb-2 h-full w-[300px] overflow-hidden rounded-md">
        {posting.thumbnailURL ? (
          <Image
            src={posting.thumbnailURL && posting.thumbnailURL}
            alt="썸네일이미지"
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className="block-drag object-cover duration-200 ease-in group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm text-gray-100">
            No Thumbnail
          </div>
        )}
      </div>
      <div className="flex select-none flex-col justify-between">
        <p className="text-sm text-beige-dark">{posting.category}</p>
        <h3 className="mb-3 truncate text-lg text-brown-dark">
          {posting.title}
        </h3>
        <p className="text-xs text-beige-dark">
          {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
        </p>
      </div>
    </div>
  )
}
