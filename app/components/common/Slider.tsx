'use client'

import React, { PropsWithChildren } from 'react'
import useDragEvent from '@/hooks/useDragEvent'
import { IconArrowLeft, IconArrowRight } from '../../../public/svgs'

export default function Slider({ children }: PropsWithChildren) {
  const {
    slideContainer,
    onDragStart,
    onDragEnd,
    onDragMove,
    onPrevButtonClick,
    onNextButtonClick,
  } = useDragEvent()

  return (
    <div className="relative">
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
        className={`hide-scroll flex cursor-grab gap-6 overflow-x-scroll scroll-smooth py-2`}
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
