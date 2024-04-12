'use client'

import React, { PropsWithChildren } from 'react'
import useSlideEvent from '@/hooks/useSlideEvent'
import { IconArrowLeft, IconArrowRight } from '../../../public/svgs/icons'

interface SliderProps {
  gap: number
  slideLength: number
}

export default function Slider({
  children,
  gap,
  slideLength,
}: PropsWithChildren<SliderProps>) {
  const {
    slideContainer,
    onDragStart,
    onDragEnd,
    onDragMove,
    onPrevButtonClick,
    onNextButtonClick,
  } = useSlideEvent(gap)

  return (
    <div className="relative w-full">
      {slideLength > 1 && (
        <button
          onClick={onPrevButtonClick}
          className="absolute left-[-12px] top-[50%] z-[10] translate-y-[-50%] rounded-full border-2 border-dashed border-beige-light bg-brown-normal text-beige-light"
        >
          <IconArrowLeft />
        </button>
      )}

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
      {slideLength > 1 && (
        <button
          onClick={onNextButtonClick}
          className="absolute right-[-12px] top-[50%] z-[10] translate-y-[-50%] rounded-full border-2 border-dashed border-beige-light bg-brown-normal text-beige-light"
        >
          <IconArrowRight />
        </button>
      )}
    </div>
  )
}
