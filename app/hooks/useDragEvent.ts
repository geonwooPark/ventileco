import { throttle } from '@/utils/throttle'
import { useCallback, useRef, useState } from 'react'

export default function useDragEvent() {
  const slideContainer = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [totalX, setTotalX] = useState(0)

  const preventUnexpectedEffects = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
    },
    [],
  )

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // preventUnexpectedEffects(e)
    setIsDragging(true)
    const x = e.clientX
    setStartPoint(x)
    if (slideContainer.current && 'scrollLeft' in slideContainer.current) {
      setTotalX(x + slideContainer.current.scrollLeft)
    }
  }

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    preventUnexpectedEffects(e)

    const scrollLeft = totalX - e.clientX

    if (slideContainer.current && 'scrollLeft' in slideContainer.current) {
      slideContainer.current.scrollLeft = scrollLeft
    }
  }

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    if (!slideContainer.current) return

    setIsDragging(false)

    const endX = e.clientX
    const childNodes = [...(slideContainer.current?.childNodes || [])]
    const dragDiff = Math.abs(startPoint - endX)

    if (dragDiff > 10) {
      childNodes.forEach((child) => {
        child.addEventListener('click', preventUnexpectedEffects as any)
      })
    } else {
      childNodes.forEach((child) => {
        child.removeEventListener('click', preventUnexpectedEffects as any)
      })
    }
  }

  const onPrevButtonClick = () => {
    if (!slideContainer.current) return

    slideContainer.current.scrollLeft -= 400
  }

  const onNextButtonClick = () => {
    if (!slideContainer.current) return

    slideContainer.current.scrollLeft += 400
  }

  const onThrottleDragMove = throttle(onDragMove, 50)

  return {
    slideContainer,
    onDragStart,
    onDragEnd,
    onDragMove: onThrottleDragMove,
    onPrevButtonClick,
    onNextButtonClick,
  }
}
