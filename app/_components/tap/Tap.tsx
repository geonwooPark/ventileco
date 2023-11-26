'use client'

import React, { useState } from 'react'

export default function Tap({
  menuArr,
}: {
  menuArr: {
    name: string
    content: React.JSX.Element
  }[]
}) {
  const [currentTap, setCurrentTap] = useState(0)
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {menuArr.map((menu, i) => {
          return (
            <button
              key={i}
              onClick={() => setCurrentTap(i)}
              className={
                currentTap === i
                  ? 'border-b-2 border-black'
                  : 'border-b-2 border-transparent text-gray-400'
              }
            >
              {menu.name}
            </button>
          )
        })}
      </div>
      <div>{menuArr[currentTap].content}</div>
    </div>
  )
}
