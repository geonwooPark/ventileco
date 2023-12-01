import React from 'react'

export default function SkeletonCommentList() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 text-sm">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
            <div className="w-[100px] h-5 bg-gray-300 rounded-lg ml-2"></div>
          </div>
          <div className="w-[50px] h-5 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="w-[70%] h-5 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="mb-4 text-sm">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
            <div className="w-[100px] h-5 bg-gray-300 rounded-lg ml-2"></div>
          </div>
          <div className="w-[50px] h-5 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="w-[70%] h-5 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="mb-4 text-sm">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
            <div className="w-[100px] h-5 bg-gray-300 rounded-lg ml-2"></div>
          </div>
          <div className="w-[50px] h-5 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="w-[70%] h-5 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  )
}
