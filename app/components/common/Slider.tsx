'use client'

import React, { PropsWithChildren } from 'react'
import useDragEvent from '@/hooks/useDragEvent'
import { IconArrowLeft, IconArrowRight } from '../../../public/svgs'

interface SliderProps {
  gap: number
}

export default function Slider({
  children,
  gap,
}: PropsWithChildren<SliderProps>) {
  const {
    slideContainer,
    onDragStart,
    onDragEnd,
    onDragMove,
    onPrevButtonClick,
    onNextButtonClick,
  } = useDragEvent(gap)

  return (
    <div className="relative w-full">
      <button
        onClick={onPrevButtonClick}
        className="absolute left-[-12px] top-[50%] z-[10] translate-y-[-50%] rounded-full border-2 border-dashed border-beige-light bg-brown-normal text-beige-light"
      >
        <IconArrowLeft />
      </button>
      <div
        ref={slideContainer}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseMove={onDragMove}
        onMouseLeave={onDragEnd}
        style={{ gap: `${gap}px` }}
        className={`hide-scroll flex cursor-grab overflow-x-scroll scroll-smooth py-2`}
      >
        {children}
      </div>
      <button
        onClick={onNextButtonClick}
        className="absolute right-[-12px] top-[50%] z-[10] translate-y-[-50%] rounded-full border-2 border-dashed border-beige-light bg-brown-normal text-beige-light"
      >
        <IconArrowRight />
      </button>
    </div>
  )
}
