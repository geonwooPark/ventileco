import React from 'react'

export default function SkeletonBookList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex h-[320px] flex-col items-center justify-center rounded-md bg-gray-100"
        >
          <div className="relative mx-auto mb-3 h-[200px] w-[160px] animate-pulse bg-gray-300 "></div>
          <div className="mb-1 h-5 w-[80%] animate-pulse rounded-sm bg-gray-300"></div>
          <div className="h-4 w-[20%] animate-pulse rounded-sm bg-gray-300"></div>
        </div>
      ))}
    </div>
  )
}
