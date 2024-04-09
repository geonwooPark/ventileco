'use client'

import React, { PropsWithChildren } from 'react'
import useDragEvent from '@/hooks/useDragEvent'

export default function Slider({ children }: PropsWithChildren) {
  const { dragContainer, onDragStart, onDragEnd, onDragMove } = useDragEvent()

  return (
    <div
      ref={dragContainer}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseMove={onDragMove}
      onMouseLeave={onDragEnd}
      className={`hide-scroll flex cursor-grab gap-6 overflow-x-scroll scroll-smooth py-2`}
    >
      {children}
    </div>
  )
}
