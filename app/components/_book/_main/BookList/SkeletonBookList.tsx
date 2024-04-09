import React from 'react'

export default function SkeletonBookList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex h-[320px] flex-col items-center justify-center rounded-md bg-beige-light"
        >
          <div className="relative mx-auto mb-3 h-[200px] w-[160px] animate-pulse bg-beige-dark"></div>
          <div className="mb-1 h-5 w-[80%] animate-pulse rounded-md bg-beige-dark"></div>
          <div className="h-4 w-[20%] animate-pulse rounded-md bg-beige-dark"></div>
        </div>
      ))}
    </div>
  )
}
