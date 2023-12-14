import React from 'react'

export default function SkeletonCommentList() {
  return (
    <ul className="animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <li key={i} className="mb-4 text-sm">
            <div className="mb-2 flex justify-between">
              <div className="flex items-center">
                <div className="h-[30px] w-[30px] rounded-full bg-gray-300"></div>
                <div className="ml-2 h-5 w-[100px] rounded-lg bg-gray-300"></div>
              </div>
              <div className="h-5 w-[50px] rounded-lg bg-gray-300"></div>
            </div>
            <div className="h-5 w-[70%] rounded-lg bg-gray-300"></div>
          </li>
        )
      })}
    </ul>
  )
}
