'use client'

import React from 'react'
import PopularListingItem from './PopularListingItem'
import { PostingType } from '@/interfaces/interface'
import useDragEvent from '@/hooks/useDragEvent'

interface PopularListingProps {
  postings: PostingType[]
}

export default function PopularListing({ postings }: PopularListingProps) {
  const { dragContainer, onDragStart, onDragEnd, onDragMove, isDragging } =
    useDragEvent()

  console.log(isDragging)

  return (
    <div
      ref={dragContainer}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseMove={onDragMove}
      onMouseLeave={onDragEnd}
      className={`hide-scroll flex cursor-grab gap-6 overflow-x-scroll scroll-smooth py-2`}
    >
      {postings.map((posting) => (
        <PopularListingItem key={posting._id} posting={posting} />
      ))}
    </div>
  )
}
