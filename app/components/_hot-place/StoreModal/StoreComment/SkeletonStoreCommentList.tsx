import React from 'react'

export default function SkeletonStoreCommentList() {
  return (
    <div className="hide-scroll h-[calc(100%-40px)] animate-pulse overflow-x-auto overflow-y-scroll border-b">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-full border-b border-gray-200 px-3 py-2">
          <div className="mb-1 flex items-center">
            <div className="size-[30px] rounded-full bg-gray-400" />
            <div className="ml-2 h-4 w-[40%] rounded-md bg-gray-400" />
          </div>
          <div className="mb-1 h-4 w-full rounded-md bg-gray-400" />
          <div className="flex justify-between">
            <div className="h-3 w-[30%] rounded-md bg-gray-400" />
          </div>
        </div>
      ))}
    </div>
  )
}
