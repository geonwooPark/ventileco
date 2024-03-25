import { throttle } from '@/utils/throttle'
import { useEffect, useRef, useState } from 'react'

export default function useProjectScroll(projectCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollIcon, setShowScrollIcon] = useState(true)

  let stage: number = 0

  useEffect(() => {
    const screenHeight = window.innerHeight

    const toScroll = (e: WheelEvent) => {
      e.preventDefault()
      const { scrollTop } = containerRef.current!
      const scrollPosition = scrollTop / screenHeight

      if (e.deltaY < 0) {
        if (scrollPosition === 0) return
        stage = Math.floor(scrollTop / screenHeight)

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage < projectCount - 1) setShowScrollIcon(true)
      } else {
        if (scrollPosition === projectCount) return
        stage =
          scrollPosition < projectCount
            ? Math.floor(scrollTop / screenHeight) + 1
            : projectCount

        containerRef.current?.scrollTo({
          top: screenHeight * stage,
          left: 0,
          behavior: 'smooth',
        })

        if (stage >= projectCount - 1) setShowScrollIcon(false)
      }
    }

    containerRef.current?.addEventListener('wheel', throttle(toScroll, 200), {
      passive: false,
    })
    return () => {
      containerRef.current?.removeEventListener(
        'wheel',
        throttle(toScroll, 200),
      )
    }
  }, [])

  return { containerRef, showScrollIcon }
}
