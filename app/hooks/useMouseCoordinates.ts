import { useEffect, useRef } from 'react'

export default function useMouseCoordinates(
  setDeg: React.Dispatch<React.SetStateAction<number>>,
) {
  const OriginRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!OriginRef.current) return

      const { x: x1, y: y1 } = e
      const { x: x2, y: y2 } = OriginRef.current.getBoundingClientRect()

      let rad = Math.atan2(y2 - y1, x2 - x1)
      if (rad < 0) rad += Math.PI * 2
      rad = (rad * 180) / Math.PI - (((rad * 180) / Math.PI) % 10)

      setDeg(rad)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  })

  return { OriginRef }
}
