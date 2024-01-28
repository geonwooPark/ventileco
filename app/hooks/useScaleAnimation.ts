import { useEffect, useState } from 'react'

export default function useScaleAnimation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setScale(true)
    } else {
      timer = setTimeout(() => {
        setScale(false)
      }, 200)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return { isOpen, scale, setIsOpen }
}
