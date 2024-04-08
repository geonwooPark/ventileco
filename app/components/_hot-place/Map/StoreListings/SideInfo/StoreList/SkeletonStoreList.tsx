import React from 'react'

export default function SkeletonStoreList() {
  return (
    <ul className="card-shadowed bg-beige-light ">
      {Array.from({ length: 7 })?.map((_, i) => (
        <li
          key={i}
          className="animate-pulse cursor-pointer rounded-md p-2 duration-100 last:mb-0 hover:bg-beige-normal"
        >
          <div className="flex gap-4">
            <div className="relative h-[60px] w-[90px] shrink-0 rounded-md bg-beige-dark"></div>
            <div className="w-full">
              <div className="mb-0.5 h-5 w-full rounded-md bg-beige-dark"></div>
              <div className="h-4 w-[30%] rounded-md bg-beige-dark"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
