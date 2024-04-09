import dayjs from '@/lib/dayjs'
import React from 'react'
import LikeButton from './LikeButton'
import { PostingType } from '@/interfaces/interface'
import Container from '@common/Container'

interface PostingInfoProps {
  posting: PostingType
}

export default function DetailPostingInfo({ posting }: PostingInfoProps) {
  return (
    <Container className="absolute inset-0 flex h-full w-full flex-col items-end justify-center text-white">
      <p className="mb-2 text-right text-sm">
        {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
      </p>
      <div className="mb-2 flex items-center justify-end">
        <LikeButton postingId={posting._id.toString()} className="mr-3" />
        <p className="text-sm md:text-base">{posting.category}</p>
      </div>
      <h1 className="mb-1 w-full text-right text-2xl font-bold md:mb-3 md:text-4xl">
        {posting.title}
      </h1>
      {posting.description && (
        <p className="w-full text-right text-sm md:text-base">
          {posting.description}
        </p>
      )}
    </Container>
  )
}
