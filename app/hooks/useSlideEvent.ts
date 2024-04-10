import { throttle } from '@/utils/throttle'
import { useCallback, useRef, useState } from 'react'

export default function useSlideEvent(gap?: number) {
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
    if (!gap) return

    const childNode = slideContainer.current.childNodes[0]
    if (!(childNode instanceof HTMLElement)) return
    const width = childNode.offsetWidth

    const isScrollAtRight =
      slideContainer.current.scrollWidth - slideContainer.current.scrollLeft ===
      slideContainer.current.clientWidth

    const visibleChildCount = Math.floor(
      slideContainer.current.offsetWidth / (width + gap),
    )

    if (isScrollAtRight) {
      slideContainer.current.scrollLeft -=
        width -
        (slideContainer.current.offsetWidth -
          (width + gap) * visibleChildCount) +
        10
    } else {
      slideContainer.current.scrollLeft -= width + gap
    }
  }

  const onNextButtonClick = () => {
    if (!slideContainer.current) return
    if (!gap) return

    const childNode = slideContainer.current.childNodes[0]
    if (!(childNode instanceof HTMLElement)) return
    const width = childNode.offsetWidth

    slideContainer.current.scrollLeft += width + gap
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
