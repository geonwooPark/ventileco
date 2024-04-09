import { throttle } from '@/utils/throttle'
import { useRef, useState } from 'react'

export default function useDragEvent() {
  const dragContainer = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [scrollPosition] = useState(0)

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault()
    if (dragContainer.current) {
      setIsDragging(true)
      setStartPoint(e.pageX + dragContainer.current?.scrollLeft)
    }
  }

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!isDragging) return
    const dragLength = e.pageX - startPoint

    if (dragContainer.current) {
      dragContainer.current.scrollLeft = scrollPosition - dragLength
    }
  }

  const onThrottleDragMove = throttle(onDragMove, 50)

  return {
    dragContainer,
    onDragStart,
    onDragEnd,
    onDragMove: onThrottleDragMove,
    isDragging,
  }
}
