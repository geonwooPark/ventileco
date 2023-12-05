'use client'

import React, { useState } from 'react'

interface TapProps {
  menuArr: {
    name: string
    content: React.JSX.Element
  }[]
}

export default function Tap({ menuArr }: TapProps) {
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
      <div className="relative pt-10">
        <div className="h-[500px] bg-gray-50 overflow-y-scroll">
          {menuArr[currentTap].content}
        </div>
      </div>
    </div>
  )
}
