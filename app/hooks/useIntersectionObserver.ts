import { BOOKLIMIT } from '@/constants'
import { useCallback, useState } from 'react'

export default function useIntersectionObserver<T>(itemList: T) {
  const [lastItem, setLastItem] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const triggerRef = useCallback(
    (node: any) => {
      if (!node) return
      if (isLoading) return

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLastItem((prev) => prev + BOOKLIMIT)
              observer.disconnect()
            }
          })
        },
        { threshold: 1 },
      )

      observer.observe(node)
    },
    [itemList],
  )

  return { lastItem, isLoading, setIsLoading, triggerRef }
}
