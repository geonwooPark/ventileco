import { throttle } from '@/utils/throttle'
import { useEffect, useRef, useState } from 'react'

export default function useFullPageScroll(projectCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollEnd, setIsScrollEnd] = useState(false)

  let stage: number = 0

  useEffect(() => {
    const screenHeight = window.innerHeight

    const toScroll = throttle((e: WheelEvent) => {
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

        if (stage < projectCount - 1) setIsScrollEnd(false)
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

        if (stage >= projectCount - 1) setIsScrollEnd(true)
      }
    }, 200)

    containerRef.current?.addEventListener('wheel', toScroll, {
      passive: false,
    })

    return () => {
      containerRef.current?.removeEventListener('wheel', toScroll)
    }
  }, [])

  return { containerRef, isScrollEnd }
}
