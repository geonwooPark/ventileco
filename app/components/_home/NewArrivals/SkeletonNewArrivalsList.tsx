import React from 'react'

export default function SkeletonNewArrivalsList() {
  return (
    <ul className="h-[124px] animate-pulse overflow-y-hidden">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <li key={i} className="mb-1.5 last:mb-0">
            <div className="h-5 items-center rounded-md border border-brown-dark bg-beige-normal"></div>
          </li>
        )
      })}
    </ul>
  )
}
