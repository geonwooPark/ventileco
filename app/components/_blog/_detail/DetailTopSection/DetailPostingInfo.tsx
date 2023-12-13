import dayjs from '@/app/utils/dayjs'
import React from 'react'
import LikeButton from './LikeButton'
import { PostingType } from '@/app/interfaces/interface'

interface PostingInfoProps {
  posting: PostingType
}

export default function DetailPostingInfo({ posting }: PostingInfoProps) {
  return (
    <div className="flex flex-col items-end justify-center h-full text-white my-container">
      <div className="absolute">
        <p className="mb-2 text-sm text-right">
          {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
        </p>
        <div className="flex items-center justify-end mb-2">
          <LikeButton postingId={posting._id.toString()} className="mr-3" />
          <p className="text-sm md:text-base">{posting.category}</p>
        </div>
        <h1 className="w-full mb-1 text-2xl font-bold text-right md:text-4xl md:mb-3">
          {posting.title}
        </h1>
        {posting.description && (
          <p className="w-full text-sm text-right md:text-base">
            {posting.description}
          </p>
        )}
      </div>
    </div>
  )
}
