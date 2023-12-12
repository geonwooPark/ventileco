import React from 'react'

export default function SkeletonListing() {
  return (
    <ul className="animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <li key={i} className="mb-6 group md:mb-12">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-[270px] h-[280px] md:h-[180px] rounded-lg overflow-hidden">
                <div className="flex items-center justify-center w-full h-full text-sm text-gray-100 bg-gray-300"></div>
              </div>
              <div className="md:w-[calc(100%-270px)] flex flex-col justify-between md:px-6 md:py-2">
                <div className="mt-3 mb-4 md:mt-0">
                  <div className="bg-gray-300 w-[60px] h-4 rounded-sm mb-1.5 md:mb-4"></div>
                  <div className="bg-gray-300 w-[70%] h-4 rounded-sm  mb-1.5"></div>
                  <div className="bg-gray-300 w-[60%] h-4 rounded-sm"></div>
                </div>
                <div className="bg-gray-300 w-[40px] h-4 rounded-sm"></div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
