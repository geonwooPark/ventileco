'use client'

import useDragEvent from '@/hooks/useSlideEvent'
import React from 'react'

interface StoreHashtagsProps {
  hashtags: string[] | null
}

export default function StoreHashtags({ hashtags }: StoreHashtagsProps) {
  const { slideContainer, onDragStart, onDragEnd, onDragMove } = useDragEvent()

  return (
    <div
      ref={slideContainer}
      className={`hide-scroll flex cursor-grab gap-2 overflow-y-hidden overflow-x-scroll scroll-smooth`}
    >
      {hashtags?.map((tag, i: number) => (
        <div
          key={i}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onMouseMove={onDragMove}
          onMouseLeave={onDragEnd}
          className="shrink-0 select-none rounded-full border border-beige-light px-3 py-1.5 text-sm text-beige-light "
        >
          #{tag}
        </div>
      ))}
    </div>
  )
}
