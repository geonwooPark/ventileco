import React from 'react'

export default function SkeletonListing() {
  return (
    <ul className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <li key={i} className="group mb-6 md:mb-12">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-[280px] w-full overflow-hidden rounded-md md:h-[180px] md:w-[270px]">
                <div className="flex h-full w-full items-center justify-center bg-beige-normal"></div>
              </div>
              <div className="flex flex-col justify-between md:w-[calc(100%-270px)] md:px-6 md:py-2">
                <div className="mb-4 mt-3 md:mt-0">
                  <div className="mb-1.5 h-4 w-[60px] rounded-md bg-beige-normal md:mb-4"></div>
                  <div className="mb-1.5 h-4 w-[70%] rounded-md bg-beige-normal"></div>
                  <div className="h-4 w-[60%] rounded-md bg-beige-normal"></div>
                </div>
                <div className="h-4 w-[40px] rounded-md bg-beige-normal"></div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
